import moment, {Moment} from "moment";
import {Domain} from "./Domain";

export class Page {

    id: string;

    domain: Domain;

    url: string;

    rating: number;

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): Page {
        return Object.assign(new Page(), data, {
            domain: Domain.deserialize(data.domain),
            createdTimestamp: moment(data.createdTimestamp),
            updateDate: moment(data.updateDate)
        });
    }
}