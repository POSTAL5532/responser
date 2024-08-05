import {ResourceType} from "./ResourceType";

export class NewWebResource {

    url: string;

    resourceType: ResourceType;

    parentId: string;


    constructor(url: string, resourceType: ResourceType) {
        this.url = url;
        this.resourceType = resourceType;
    }
}
