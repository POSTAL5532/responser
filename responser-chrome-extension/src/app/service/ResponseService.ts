import {ApiClient} from "./ApiClient";
import {Response} from "../model/Response";
import {CreateResponsePayload} from "../model/CreateResponsePayload";

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

    createResponse = async (payload: CreateResponsePayload): Promise<Response> => {
        const createdResponse = await this.client.executePostRequest(BASE_RESPONSES_URL, payload);
        return Response.deserialize(createdResponse);
    }
}
