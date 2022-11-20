import moment, {Moment} from "moment";
import {Domain} from "./Domain";

export class Resource {

    id: string;

    domain: Domain;

    url: string;

    name: string;

    description: string;

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): Resource {
        return Object.assign(new Resource(), data, {
            domain: Domain.deserialize(data.domain),
            createdTimestamp: moment(data.createdTimestamp),
            updateDate: moment(data.updateDate)
        });
    }
}