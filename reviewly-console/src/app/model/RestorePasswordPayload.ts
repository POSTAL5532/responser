import {makeAutoObservable} from "mobx";

export class RestorePasswordPayload {

    restorePasswordId: string;

    newPassword: string;

    confirmNewPassword: string;

    constructor(restorePasswordId: string = null) {
        makeAutoObservable(this);
        this.restorePasswordId = restorePasswordId;
    }
}
