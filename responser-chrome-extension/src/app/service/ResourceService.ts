import {ApiClient} from "./ApiClient";
import {Resource} from "../model/Resource";
import {CreateResourcePayload} from "../model/CreateResourcePayload";

const BASE_RESOURCES_URL = "/resources";

export class ResourceService {

    client: ApiClient = new ApiClient();

    public getResourceByUrl = async (url: string): Promise<Resource> => {
        const data = await this.client.executeGetRequest(
            BASE_RESOURCES_URL,
            {params: {url}}
        )

        return Resource.deserialize(data);
    }

    public createResource = async (payload: CreateResourcePayload): Promise<Resource> => {
        const createdResource = await this.client.executePostRequest(BASE_RESOURCES_URL, payload);
        return Resource.deserialize(createdResource);
    }
}
