import moment, {Moment} from "moment";

export class Domain {

    id: string;

    domain: string;

    name: string;

    description: string;

    rating: number;

    hasSsl: boolean;

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): Domain {
        return Object.assign(new Domain(), data, {
            createdTimestamp: moment(data.createdTimestamp),
            updateDate: moment(data.updateDate)
        })
    }
}
