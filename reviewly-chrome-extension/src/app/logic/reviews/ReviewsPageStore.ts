import {action, makeAutoObservable} from "mobx";
import {Review} from "../../model/Review";
import {ReviewService} from "../../service/ReviewService";
import {useState} from "react";
import {ApiError, ApiErrorType} from "../../model/ApiError";
import {ExtensionService} from "../../service/extension/ExtensionService";
import {PageInfo} from "../../model/PageInfo";
import {ReviewsRequestCriteria} from "../../model/ReviewsRequestCriteria";
import {ReviewLike} from "../../model/ReviewLike";
import {ReviewLikeData} from "../../model/ReviewLikeData";
import {ReviewLikeService} from "../../service/ReviewLikeService";
import {ResourceType} from "../../model/ResourceType";
import {Pagination} from "../../model/Pagination";
import {Logger} from "../../utils/Logger";
import {WebResource} from "../../model/WebResource";
import {WebResourceService} from "../../service/WebResourceService";
import {NewWebResource} from "../../model/NewWebResource";
import {ReviewsCriteriaSortingField} from "../../model/ReviewsCriteriaSortingField";
import {SortDirection} from "../../model/SortDirection";
import {compareSiteIconBlobWithGoogleTemplate} from "../../utils/ResourcesUtils";

const PAGE_ELEMENTS_COUNT = 10;

export class ReviewsPageStore {

    logger: Logger = new Logger("ReviewsPageStore");

    extensionService: ExtensionService = new ExtensionService();

    webResourceService: WebResourceService = new WebResourceService();

    reviewService: ReviewService = new ReviewService();

    reviewLikeService: ReviewLikeService = new ReviewLikeService();

    reviewsResourceType: ResourceType;

    /**
     * Current view page info from content layer.
     */
    currentPageInfo: PageInfo;

    reviewsCriteria: ReviewsRequestCriteria;

    editableSortingCriteria: EditableSortingCriteria;

    editableFilterCriteria: EditableFilterCriteria;

    site: WebResource;

    page: WebResource;

    currentUserReview: Review;

    reviews: Review[] = [];

    loadingState: ReviewsPageStoreLoadingState = new ReviewsPageStoreLoadingState();

    currentPageNumber: number;

    hasNextReviews: boolean;

    currentUserId: string;

    reviewIdForShare: string;

    constructor() {
        makeAutoObservable(this);
    }

    // TODO: Refactoring of loading state on the initialization step - some UI elements checks the {some_resource} == null for detecting of loading process instead of loading store using
    init = async (resourceType: ResourceType, currentUserId: string) => {
        this.logger.debug("Init store: resourceType=", resourceType, ", currentUserId=", currentUserId);

        this.currentUserId = currentUserId;
        this.currentPageNumber = 0;
        this.hasNextReviews = false;

        this.reviewsResourceType = resourceType || ResourceType.SITE;
        this.loadingState.isPageInfoLoading = true;
        const pageInfo = await this.extensionService.getCurrentPageInfo().finally(
            () => this.loadingState.isPageInfoLoading = false
        );

        this.currentPageInfo = pageInfo.data;

        await this.initSite();
        await this.initPage();

        this.initCriteria();

        await this.loadCurrenUserReview();
        await this.loadReviews();

        this.logger.debug("Store initialisation finished");
    }

    @action
    initCriteria = () => {
        this.reviewsCriteria = new ReviewsRequestCriteria();
        this.reviewsCriteria.sortingField = ReviewsCriteriaSortingField.CREATION_DATE;
        this.reviewsCriteria.sortDirection = SortDirection.DESC;
        this.reviewsCriteria.excludeUserId = this.currentUserId;
        this.reviewsCriteria.minRating = 1;
        this.reviewsCriteria.maxRating = 5;

        if (this.reviewsResourceType === ResourceType.SITE) {
            this.reviewsCriteria.resourceId = this.site.id;
        } else if (this.reviewsResourceType === ResourceType.PAGE) {
            this.reviewsCriteria.resourceId = this.page.id;
        }
    }

    @action
    setupEditableSortingCriteria = (editableSortingCriteria?: EditableSortingCriteria) => {
        if (editableSortingCriteria !== undefined) {
            this.editableSortingCriteria = editableSortingCriteria;
            return;
        }

        this.editableSortingCriteria = new EditableSortingCriteria();
        this.editableSortingCriteria.sortingField = this.reviewsCriteria.sortingField;
        this.editableSortingCriteria.sortDirection = this.reviewsCriteria.sortDirection;
    }

    @action
    setCriteriaSorting = (sortingWrapper: SortingWrapper) => {
        this.editableSortingCriteria.sortDirection = sortingWrapper.sortDirection;
        this.editableSortingCriteria.sortingField = sortingWrapper.sortingField;
    }

    @action
    setupEditableFilterCriteria = (editableFilterCriteria?: EditableFilterCriteria) => {
        if (editableFilterCriteria !== undefined) {
            this.editableFilterCriteria = editableFilterCriteria;
            return;
        }

        this.editableFilterCriteria = new EditableFilterCriteria();
        this.editableFilterCriteria.maxRating = this.reviewsCriteria.maxRating;
        this.editableFilterCriteria.minRating = this.reviewsCriteria.minRating;
    }

    @action
    applyEditableCriteria = () => {
        this.reviewsCriteria.sortingField = this.editableSortingCriteria?.sortingField || this.reviewsCriteria.sortingField;
        this.reviewsCriteria.sortDirection = this.editableSortingCriteria?.sortDirection || this.reviewsCriteria.sortDirection;
        this.reviewsCriteria.minRating = this.editableFilterCriteria?.minRating || this.reviewsCriteria.minRating;
        this.reviewsCriteria.maxRating = this.editableFilterCriteria?.maxRating || this.reviewsCriteria.maxRating;
    }

    fetchSiteFavicon = async (urlString: string): Promise<Blob> => {
        const url = new URL(urlString);
        const fetchUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url.origin}&size=64`;
        const response = await fetch(fetchUrl);

        return await response.blob();
    }

    getSiteIcon = async (siteUrl: string): Promise<Blob> => {
        this.logger.debug("Fetch site icon - start");

        let siteIconBlob: Blob = null;
        try {
            siteIconBlob = await this.fetchSiteFavicon(siteUrl);

            if (!!siteIconBlob) {
                siteIconBlob = (await compareSiteIconBlobWithGoogleTemplate(siteIconBlob)) ? null : siteIconBlob;
            }
        } catch (e) {
            this.logger.warning("Can't to fetch icon for site " + siteUrl);
        }

        this.logger.debug("Fetch site icon - finish:", !!siteIconBlob ? "has icon" : "no icon");

        return siteIconBlob;
    }

    initSite = async () => {
        const {url} = this.currentPageInfo;

        this.logger.debug("Init site with URL=", url);

        this.loadingState.isSiteLoading = true;

        try {
            this.site = await this.webResourceService.getSiteByUrl(url);
        } catch (error: any) {
            this.logger.debug("Init site error - check type of error...");
            if (error instanceof ApiError && error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                this.logger.debug("Init site error is 'ENTITY_NOT_FOUND' type - create new site.");
                const newWebResource = new NewWebResource(url, ResourceType.SITE);
                const siteIconBlob: Blob = await this.getSiteIcon(url);
                this.site = await this.webResourceService.create(newWebResource, siteIconBlob);
            } else {
                this.logger.error("Init site error is unknown: ", error);
                throw error;
            }
        } finally {
            this.loadingState.isSiteLoading = false;
        }

        this.logger.debug("Site initialisation finished.");
    }

    initPage = async () => {
        const {url, description, title} = this.currentPageInfo;

        this.logger.debug("Init page: url=", url, ", description=", description, ", title=", title);

        this.loadingState.isPageLoading = true;

        try {
            this.page = await this.webResourceService.getPageByUrl(url);
        } catch (error: any) {
            this.logger.debug("Init page error - check type of error...");
            if (error instanceof ApiError && error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                this.logger.debug("Init page error is 'ENTITY_NOT_FOUND' type - create new page.");
                const createPagePayload = new NewWebResource(url, ResourceType.PAGE);
                createPagePayload.parentId = this.site.id;
                this.page = await this.webResourceService.create(createPagePayload);
            } else {
                this.logger.error("Init page error is unknown: ", error);
                throw error;
            }
        } finally {
            this.loadingState.isPageLoading = false;
        }

        this.logger.debug("Page initialisation finished.");
    }

    loadCurrenUserReview = async () => {
        if (!this.currentUserId) {
            this.logger.debug("Not load current user review - no current user");
            return;
        }

        this.logger.debug("Load current user review");

        const criteria = new ReviewsRequestCriteria();
        criteria.forUserId = this.currentUserId;
        if (this.reviewsResourceType === ResourceType.PAGE) {
            criteria.resourceId = this.page.id;
        } else if (this.reviewsResourceType === ResourceType.SITE) {
            criteria.resourceId = this.site.id;
        }

        this.loadingState.isReviewsLoading = true;
        const reviews = await this.reviewService.getReviews(criteria, Pagination.SINGLE_ELEMENT).finally(
            () => this.loadingState.isReviewsLoading = false
        );

        this.currentUserReview = reviews.data[0];
    }

    loadReviews = async () => {
        this.logger.debug("Load reviews");

        const pagination = new Pagination(this.currentPageNumber, PAGE_ELEMENTS_COUNT);
        // const criteria = this.getReviewsRequestCriteria(this.currentUserId);

        this.loadingState.isReviewsLoading = true;
        const reviewsResponse = await this.reviewService.getReviews(this.reviewsCriteria, pagination).finally(
            () => this.loadingState.isReviewsLoading = false
        );

        this.reviews = reviewsResponse.data;
        this.hasNextReviews = !reviewsResponse.isLast;
    }

    loadNextReviews = async () => {
        if (!this.hasNextReviews || this.loadingState.isNextReviewsLoading) return;

        this.logger.debug("Load next reviews");

        // const criteria = this.getReviewsRequestCriteria(this.currentUserId);
        const pagination = new Pagination(
            this.currentPageNumber + 1,
            PAGE_ELEMENTS_COUNT
        );

        this.loadingState.isNextReviewsLoading = true;
        const reviewsResponse = await this.reviewService.getReviews(this.reviewsCriteria, pagination).finally(
            () => this.loadingState.isNextReviewsLoading = false
        );

        this.reviews.push(...reviewsResponse.data);
        this.currentPageNumber += 1;
        this.hasNextReviews = !reviewsResponse.isLast;
    }

    removeUserReview = async (): Promise<void> => {
        if (!this.currentUserReview) return;

        this.logger.debug("Remove current user review");

        this.loadingState.isReviewRemoving = true;
        await this.reviewService.deleteReview(this.currentUserReview.id).finally(
            () => this.loadingState.isReviewRemoving = false
        );

        this.extensionService.updateRatingBadge();
        this.currentUserReview = null;
    }

    createReviewLike = async (review: Review, positive: boolean): Promise<void> => {
        this.logger.debug("Create review like: review id=", review.id, ", positive=", positive);
        await this.reviewLikeService.createLike(new ReviewLikeData(review.id, positive));
        await this.refreshReviewInArray(review.id);
    }

    updateReviewLike = async (reviewLike: ReviewLike, positive: boolean): Promise<void> => {
        this.logger.debug("Update review like: review like id=", reviewLike.id, ", positive=", positive);
        await this.reviewLikeService.updateLike(new ReviewLikeData(reviewLike.reviewId, positive), reviewLike.id);
        await this.refreshReviewInArray(reviewLike.reviewId);
    }

    removeReviewLike = async (reviewLike: ReviewLike): Promise<void> => {
        this.logger.debug("Remove review like: review like id=", reviewLike.id);
        await this.reviewLikeService.deleteLike(reviewLike.id);
        await this.refreshReviewInArray(reviewLike.reviewId);
    }

    private refreshReviewInArray = async (reviewId: string): Promise<void> => {
        this.logger.debug("Refresh review in array");
        const updatedReview = await this.reviewService.getReview(reviewId);

        if (updatedReview.id === this.currentUserReview?.id) {
            this.currentUserReview = updatedReview;
        } else {
            const updatedIndex = this.reviews.findIndex(r => r.id === updatedReview.id);
            this.reviews.splice(updatedIndex, 1, updatedReview);
        }
    }
}

export const useReviewsPageStore = (): ReviewsPageStore => {
    const [reviewsPageStore] = useState(new ReviewsPageStore());
    return reviewsPageStore;
}

export class ReviewsPageStoreLoadingState {

    isPageInfoLoading: boolean = false;

    isSiteLoading: boolean = false;

    isPageLoading: boolean = false;

    isReviewsLoading: boolean = false;

    isReviewRemoving: boolean = false;

    isNextReviewsLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
}

export class EditableSortingCriteria {

    sortingField: ReviewsCriteriaSortingField;

    sortDirection: SortDirection;

    constructor() {
        makeAutoObservable(this);
    }
}

export class EditableFilterCriteria {

    maxRating: number;

    minRating: number;

    constructor() {
        makeAutoObservable(this);
    }
}

export class SortingWrapper {

    sortingField: ReviewsCriteriaSortingField;

    sortDirection: SortDirection;

    constructor(sortingField: ReviewsCriteriaSortingField, sortDirection: SortDirection) {
        this.sortingField = sortingField;
        this.sortDirection = sortDirection;
    }
}
