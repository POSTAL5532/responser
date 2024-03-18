import {makeAutoObservable} from "mobx";

export class ReviewData {

    resourceId: string;

    rating: number;

    text: string;

    constructor() {
        makeAutoObservable(this);
    }
}
