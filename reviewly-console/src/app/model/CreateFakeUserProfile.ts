import {makeAutoObservable} from "mobx";

export class CreateFakeUserProfile {

    fullName: string;

    constructor() {
        makeAutoObservable(this);
    }
}
