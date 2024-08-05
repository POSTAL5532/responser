import {ApiClient} from "./ApiClient";
import {WebResource} from "../model/WebResource";
import {ResourceType} from "../model/ResourceType";
import {NewWebResource} from "../model/NewWebResource";

const BASE_WEB_RESOURCE_URL = "/web-resources";

export class WebResourceService {

    client: ApiClient = new ApiClient();

    public getSiteByUrl = async (url: string): Promise<WebResource> => {
        return await this.getByUrl(url, ResourceType.SITE);
    }

    public getPageByUrl = async (url: string): Promise<WebResource> => {
        return await this.getByUrl(url, ResourceType.PAGE);
    }

    public getByUrl = async (url: string, resourceType: ResourceType): Promise<WebResource> => {
        const data = await this.client.executeGetRequest(BASE_WEB_RESOURCE_URL, {params: {url, resourceType}}, true);
        return WebResource.deserialize(data);
    }

    public create = async (newWebResource: NewWebResource, siteIcon: Blob = null): Promise<WebResource> => {
        const formData = new FormData();
        formData.append("newWebResource", new Blob([JSON.stringify(newWebResource)], {type: "application/json"}));
        formData.append("siteIcon", siteIcon);

        const createdPage = await this.client.executePostRequest(BASE_WEB_RESOURCE_URL, formData, undefined, true);
        return WebResource.deserialize(createdPage);
    }
}
