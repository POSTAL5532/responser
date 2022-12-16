import {ApiClient} from "./ApiClient";
import {Page} from "../model/Page";
import {CreatePagePayload} from "../model/CreatePagePayload";

const BASE_PAGES_URL = "/pages";

export class PagesService {

    client: ApiClient = new ApiClient();

    public getPageByUrl = async (url: string): Promise<Page> => {
        const data = await this.client.executeGetRequest(BASE_PAGES_URL, {params: {url}});
        return Page.deserialize(data);
    }

    public createPage = async (payload: CreatePagePayload): Promise<Page> => {
        const createdPage = await this.client.executePostRequest(BASE_PAGES_URL, payload);
        return Page.deserialize(createdPage);
    }
}
