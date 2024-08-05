import {makeAutoObservable} from "mobx";
import {RegisteredBy} from "./RegisteredBy";

export class UserCriteria {

    id: string;

    fullName: string;

    registeredBy: RegisteredBy;

    constructor() {
        makeAutoObservable(this);
    }
}
