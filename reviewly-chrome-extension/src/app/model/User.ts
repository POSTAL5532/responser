import moment, {Moment} from "moment";
import {makeAutoObservable} from "mobx";

export class User {

    constructor() {
        makeAutoObservable(this);
    }

    id: string;

    email: string;

    fullName: string;

    emailConfirmed: boolean;

    avatarFileName: string;

    createdTimestamp: Moment;

    updateDate: Moment;

    public static deserialize(data: any): User {
        return Object.assign(new User(), data, {
            createdTimestamp: moment(data.createdTimestamp),
            updateDate: moment(data.updateDate)
        })
    }
}