import {useState} from "react";
import {ReviewService} from "../../../service/ReviewService";
import {Logger} from "../../../utils/Logger";
import {WebResourceService} from "../../../service/WebResourceService";
import {ResourceType} from "../../../model/ResourceType";
import {makeAutoObservable, runInAction} from "mobx";
import {NewWebResource} from "../../../model/NewWebResource";
import {ApiError, ApiErrorType} from "../../../model/ApiError";
import {notification} from 'antd';
import {UserService} from "../../../service/UserService";
import {UserCriteria} from "../../../model/UserCriteria";
import {RegisteredBy} from "../../../model/RegisteredBy";
import {Pagination} from "../../../model/Pagination";
import {User} from "../../../model/User";
import {CreateFakeUserProfile} from "../../../model/CreateFakeUserProfile";
import {ReviewInfoAdmin} from "../../../model/ReviewInfoAdmin";

export class CreateFakeReviewPageStore {

    public static readonly USERS_ELEMENTS_COUNT = 5;

    logger: Logger = new Logger("CreateFakeReviewPageStore");

    reviewsService: ReviewService = new ReviewService();

    userService: UserService = new UserService();

    webResourceService: WebResourceService = new WebResourceService();

    webResourceUrl: string = null;

    resourceType: ResourceType = ResourceType.SITE;

    userFullName: string = null;

    loadedUsers: User[] = [];

    totalUsersCount: number = 0;

    triedUsersLoading: boolean = false;

    reviewInfo: ReviewInfoAdmin;

    isLoading: boolean = false;

    newReviewId: string = null;

    constructor() {
        this.reviewInfo = new ReviewInfoAdmin();
        this.reviewInfo.rating = 3;

        makeAutoObservable(this);
    }

    public findOrCreateResource = async () => {
        const siteId = await this.findOrCreateSite();
        let pageId;

        if (this.resourceType === ResourceType.PAGE) {
            pageId = await this.findOrCreatePage(siteId);
        }

        this.reviewInfo.resourceId = this.resourceType === ResourceType.SITE ? siteId : pageId;
    }

    public findOrCreateSite = async () => {
        this.logger.debug("Init site with URL=", this.webResourceUrl);

        this.isLoading = true;
        let site;

        try {
            site = await this.webResourceService.getSiteByUrl(this.webResourceUrl);
            notification.info({message: "Site was found successfully.", duration: 2});
        } catch (error: any) {
            this.logger.debug("Init site error - check type of error...");

            if (error instanceof ApiError && error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                this.logger.debug("Init site error is 'ENTITY_NOT_FOUND' type - create new site.");
                site = await this.webResourceService.create(new NewWebResource(this.webResourceUrl, ResourceType.SITE));
                notification.success({message: "Site was created successfully", duration: 2});
            } else {
                this.logger.error("Init site error is unknown: ", error);
                notification.error({message: "Site initialization unknown error occurred.", duration: 2});
                throw error;
            }
        } finally {
            this.isLoading = false;
        }

        this.logger.debug("Site initialisation finished.");
        return site.id;
    }

    public findOrCreatePage = async (siteId: string) => {
        this.logger.debug("Init page: url=", this.webResourceUrl);
        this.isLoading = true;

        let page;

        try {
            page = await this.webResourceService.getPageByUrl(this.webResourceUrl);

            notification.info({message: "Page was found successfully.", duration: 2});
        } catch (error: any) {
            this.logger.debug("Init page error - check type of error...");

            if (error instanceof ApiError && error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                this.logger.debug("Init page error is 'ENTITY_NOT_FOUND' type - create new page.");

                const createPagePayload = new NewWebResource(this.webResourceUrl, ResourceType.PAGE);
                createPagePayload.parentId = siteId;
                page = await this.webResourceService.create(createPagePayload);

                notification.success({message: "Page was created successfully.", duration: 2});
            } else {
                this.logger.error("Init page error is unknown: ", error);
                notification.error({message: "Page initialization unknown error occurred.", duration: 2});
                throw error;
            }
        } finally {
            this.isLoading = false;
        }

        this.logger.debug("Page initialisation finished.");
        return page.id;
    }

    loadUsers = async (page: number) => {
        if (this.isLoading) return;

        this.logger.debug("Load users with page: " + page);
        this.isLoading = true;

        const pagination = new Pagination(page, CreateFakeReviewPageStore.USERS_ELEMENTS_COUNT);
        const userCriteria = new UserCriteria();
        userCriteria.fullName = this.userFullName;
        userCriteria.registeredBy = RegisteredBy.FAKE;

        const usersResponse = await this.userService.getUsers(userCriteria, pagination).finally(
            () => runInAction(() => this.isLoading = false)
        );

        this.loadedUsers = usersResponse.data;
        this.totalUsersCount = usersResponse.totalElements;
        this.triedUsersLoading = true;
    }

    createFakeUser = async () => {
        this.logger.debug("Create fake user: " + this.userFullName);
        this.isLoading = true;

        const fakeUserProfile = new CreateFakeUserProfile();
        fakeUserProfile.fullName = this.userFullName;

        await this.userService.createFakeUser(fakeUserProfile);
        this.isLoading = false;
        await this.loadUsers(0);
    }

    saveFakeReview = async () => {
        this.logger.debug("Save fake review");
        this.isLoading = true;
        const newReview = await this.reviewsService.createFakeReview(this.reviewInfo);
        this.newReviewId = newReview.id;
        this.isLoading = false;
    }
}

export const useCreateFakeReviewPageStore = (): CreateFakeReviewPageStore => {
    const [createFakeReviewPageStore] = useState(new CreateFakeReviewPageStore());
    return createFakeReviewPageStore;
}
