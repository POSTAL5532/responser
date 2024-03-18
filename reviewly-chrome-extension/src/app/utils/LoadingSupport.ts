import {v4 as uuid} from 'uuid';

export class LoadingSupport {

    private loadings: string[];

    public callWithLoading = <T = any>(func: () => Promise<T>, name?: string): Promise<T> => {
        const loadingId: string = name || uuid();
        this.loadings.push(loadingId);

        return func().finally(() => {
            this.loadings = this.loadings.filter(id => id === loadingId)
        });
    }
}