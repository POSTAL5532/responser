import {makeAutoObservable} from "mobx";

export class LoadingStore {

    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    withLoading = <T>(func: () => Promise<T>): Promise<T> => {
        this.isLoading = true;
        return func().finally(() => this.isLoading = false)
    }
}