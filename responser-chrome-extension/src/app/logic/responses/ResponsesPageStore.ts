import {makeAutoObservable} from "mobx";
import {Response} from "../../model/Response";
import {LoadingStore} from "../../utils/LoadingStore";
import {ResponseService} from "../../service/ResponseService";
import {useState} from "react";
import {Domain} from "../../model/Domain";
import {Resource} from "../../model/Resource";
import {DomainService} from "../../service/DomainService";
import {ResourceService} from "../../service/ResourceService";
import {ApiErrorType} from "../../model/ApiError";
import {CreateDomainPayload} from "../../model/CreateDomainPayload";
import {CreateResourcePayload} from "../../model/CreateResourcePayload";

export class ResponsesPageStore extends LoadingStore {

    domainService: DomainService = new DomainService();

    resourceService: ResourceService = new ResourceService();

    responseService: ResponseService = new ResponseService();

    domain: Domain;

    resource: Resource;

    responses: Response[] = [];

    constructor() {
        super();
        makeAutoObservable(this);
    }

    init = async (url: string) => {
        await this.initDomain(url);
        await this.initResource(url);
        await this.loadResponses(this.resource.id);
    }

    initDomain = async (url: string) => {
        try {
            this.domain = await this.domainService.getDomainByUrl(url);
        } catch (error: any) {
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                const newDomainPayload = new CreateDomainPayload(url, `test dom name ${Date.now().toString()}`);
                this.domain = await this.domainService.createDomain(newDomainPayload);
            }
        }
    }

    initResource = async (url: string) => {
        try {
            this.resource = await this.resourceService.getResourceByUrl(url);
        } catch (error: any) {
            if (error.errorType === ApiErrorType.ENTITY_NOT_FOUND) {
                const testttt = Date.now().toString();
                const newResourcePayload = new CreateResourcePayload(
                    this.domain.id,
                    url,
                    `test res name ${testttt}`,
                    `test res description ${testttt}`
                );
                this.resource = await this.resourceService.createResource(newResourcePayload);
            }
        }
    }

    loadResponses = async (resourceId: string) => {
        this.responses = await this.responseService.getResponses(resourceId);
    }
}

export const useResponsesPageStore = (): ResponsesPageStore => {
    const [responsesPageStore] = useState(new ResponsesPageStore());
    return responsesPageStore;
}
