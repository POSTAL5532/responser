import {ResourceType} from "./ResourceType";
import {Moment} from "moment";
import moment from "moment/moment";

export class WebResource {

    id: string;

    url: string;

    resourceType: ResourceType;

    iconFileName: string;

    parent: WebResource;

    rating: number;

    reviewsCount: number;

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): WebResource {
        return Object.assign(new WebResource(), data, {
            parent: data.parent ? WebResource.deserialize(data.parent) : null,
            createdTimestamp: data.createdTimestamp ? moment(data.createdTimestamp) : null,
            updateDate: data.updateDate ? moment(data.updateDate) : null
        })
    }
}
