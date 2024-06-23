import {makeAutoObservable} from "mobx";

export class UpdateUserPayload {

    constructor() {
        makeAutoObservable(this);
    }

    email: string;

    fullName: string;
}
