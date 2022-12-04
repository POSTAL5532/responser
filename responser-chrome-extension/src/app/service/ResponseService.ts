import {ApiClient} from "./ApiClient";
import {Response} from "../model/Response";
import {ResponseData} from "../model/ResponseData";

const BASE_RESPONSES_URL = "/responses";

export class ResponseService {

    client: ApiClient = new ApiClient();

    getResponses = async (resourceId: string): Promise<Response[]> => {
        const data: any[] = await this.client.executeGetRequest(
            BASE_RESPONSES_URL,
            {params: {resourceId}}
        );

        return data.map((el: any) => Response.deserialize(el));
    }

    getResponse = async (responseId: string): Promise<Response> => {
        const data = await this.client.executeGetRequest(`${BASE_RESPONSES_URL}/${responseId}`);
        return Response.deserialize(data);
    }

    createResponse = async (payload: ResponseData): Promise<Response> => {
        const createdResponse = await this.client.executePostRequest(BASE_RESPONSES_URL, payload);
        return Response.deserialize(createdResponse);
    }

    updateResponse = async (responseId: string, payload: ResponseData): Promise<Response> => {
        const createdResponse = await this.client.executePutRequest(`${BASE_RESPONSES_URL}/${responseId}`, payload);
        return Response.deserialize(createdResponse);
    }
}
