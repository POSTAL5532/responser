import moment, {Moment} from "moment";
import {makeAutoObservable} from "mobx";
import {RegisteredBy} from "./RegisteredBy";
import {Role} from "./Role";
import {UserSpamIndicator} from "./UserSpamIndicator";

export class User {

    constructor() {
        makeAutoObservable(this);
    }

    id: string;

    email: string;

    fullName: string;

    avatarFileName: string;

    emailConfirmed: boolean;

    registeredBy: RegisteredBy;

    isUsePasswordStub: boolean;

    roles: Role[];

    userSpamIndicator: UserSpamIndicator;

    creationDate: Moment;

    updateDate: Moment;

    public static deserialize(data: any): User {
        return Object.assign(new User(), data, {
            creationDate: data.creationDate ? moment(data.creationDate) : null,
            updateDate: data.updateDate ? moment(data.updateDate) : null
        })
    }
}