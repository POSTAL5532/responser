import moment, {Moment} from "moment";
import {makeAutoObservable} from "mobx";

export class User {

    constructor() {
        makeAutoObservable(this);
    }

    id: string;

    userName: string;

    email: string;

    fullName: string;

    emailConfirmed: boolean;

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): User {
        return Object.assign(new User(), data, {
            creationDate: data.creationDate ? moment(data.creationDate) : null,
            updateDate: data.updateDate ? moment(data.updateDate) : null
        })
    }
}