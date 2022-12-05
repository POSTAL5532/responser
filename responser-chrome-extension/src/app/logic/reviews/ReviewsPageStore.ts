import {makeAutoObservable} from "mobx";
import {Review} from "../../model/Review";
import {LoadingStore} from "../../utils/LoadingStore";
import {ReviewService} from "../../service/ReviewService";
import {useState} from "react";
import {Domain} from "../../model/Domain";
import {Resource} from "../../model/Resource";
import {DomainService} from "../../service/DomainService";
import {ResourceService} from "../../service/ResourceService";
import {ApiErrorType} from "../../model/ApiError";
import {CreateDomainPayload} from "../../model/CreateDomainPayload";
import {CreateResourcePayload} from "../../model/CreateResourcePayload";
import {ExtensionService} from "../../service/extension/ExtensionService";
import {PageInfo} from "../../model/PageInfo";

export class ReviewsPageStore extends LoadingStore {

    extensionService: ExtensionService = new ExtensionService();

    domainService: DomainService = new DomainService();

    resourceService: ResourceService = new ResourceService();

    reviewService: ReviewService = new ReviewService();

    currentPageInfo: PageInfo;

    domain: Domain;

    resource: Resource;

    reviews: Review[] = [];

    constructor() {
        super();
        makeAutoObservable(this);
    }

    init = async () => {
        this.currentPageInfo = (await this.extensionService.getCurrentPageInfo()).data;
        await this.initDomain();
        await this.initResource();
        await this.loadReviews();
    }

    initDomain = async () => {
        const {url} = this.currentPageInfo;

        try {
            this.domain = await this.domainService.getDomainByUrl(url);
        } catch (error: any) {
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                const newDomainPayload = new CreateDomainPayload(url, "NO_DESCRIPTION");
                this.domain = await this.domainService.createDomain(newDomainPayload);
            }
        }
    }

    initResource = async () => {
        const {url, description, title} = this.currentPageInfo;

        try {
            this.resource = await this.resourceService.getResourceByUrl(url);
        } catch (error: any) {
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                const newResourcePayload = new CreateResourcePayload(this.domain.id, url, title, description);
                this.resource = await this.resourceService.createResource(newResourcePayload);
            }
        }
    }

    loadReviews = async () => {
        this.reviews = await this.reviewService.getReviews(this.resource.id);
    }
}

export const useReviewsPageStore = (): ReviewsPageStore => {
    const [reviewsPageStore] = useState(new ReviewsPageStore());
    return reviewsPageStore;
}
