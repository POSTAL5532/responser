import {makeAutoObservable} from "mobx";

export class UpdateUserPasswordPayload {

    constructor() {
        makeAutoObservable(this);
    }

    oldPassword: string = "";

    newPassword: string = "";

    /**
     * Doesn't use on backend API
     */
    confirmNewPassword: string = "";
}
