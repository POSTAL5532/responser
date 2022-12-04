import {makeAutoObservable} from "mobx";
import {ResponseService} from "../../service/ResponseService";
import {useState} from "react";
import {ResponseData} from "../../model/ResponseData";

export class EditResponsePageStore {

    responseService: ResponseService = new ResponseService();

    responseId: string;

    responseData: ResponseData;

    constructor() {
        makeAutoObservable(this);
    }

    public init = async (responseId: string, resourceId: string) => {
        if (!!responseId) {
            await this.initResponseById(responseId);
        } else {
            this.initNewResponse(resourceId);
        }
    }

    public saveResponse = async () => {
        if (this.responseId) {
            await this.responseService.updateResponse(this.responseId, this.responseData);
        } else {
            await this.responseService.createResponse(this.responseData);
        }
    }

    private initResponseById = async (responseId: string) => {
        const response = await this.responseService.getResponse(responseId);

        this.responseData = new ResponseData(
            response.resourceId,
            response.rating,
            response.text
        );

        this.responseId = response.id;
    }

    private initNewResponse = (resourceId: string) => {
        this.responseData = new ResponseData(resourceId, 1, "");
    }
}

export const useEditResponsePageStore = (): EditResponsePageStore => {
    const [editResponsePageStore] = useState<EditResponsePageStore>(new EditResponsePageStore());
    return editResponsePageStore;
}
