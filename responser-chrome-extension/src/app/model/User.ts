import moment, {Moment} from "moment";

export class User {
    id: string;

    userName: string;

    email: string;

    firstName: string;

    lastName: string;

    createdTimestamp: Moment;

    updateDate: Moment;

    public static deserialize(data: any): User {
        return Object.assign(new User(), data, {
            createdTimestamp: moment(data.createdTimestamp),
            updateDate: moment(data.updateDate)
        })
    }
}