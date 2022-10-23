import {makeAutoObservable} from "mobx";

export class LoginPayload {

    constructor() {
        makeAutoObservable(this);
    }

    email: string = "";

    password: string = "";
}
