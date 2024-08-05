import {makeAutoObservable} from "mobx";

export class ReviewInfoAdmin {

    resourceId: string;

    userId: string;

    rating: number;

    text: string;

    constructor() {
        makeAutoObservable(this);
    }
}
