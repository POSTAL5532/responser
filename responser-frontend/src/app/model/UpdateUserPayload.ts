import {makeAutoObservable} from "mobx";

export class UpdateUserPayload {

    constructor() {
        makeAutoObservable(this);
    }

    userName: string;

    email: string;

    fullName: string;
}
