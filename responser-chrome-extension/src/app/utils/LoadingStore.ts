export class LoadingStore {

    isLoading: boolean = false;

    withLoading = <T>(func: () => Promise<T>): Promise<T> => {
        this.isLoading = true;
        return func().finally(() => this.isLoading = false)
    }
}