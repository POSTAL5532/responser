import {makeAutoObservable} from "mobx";

export class ForgotPasswordPayload {

    email: string;

    constructor() {
        makeAutoObservable(this);
    }
}
