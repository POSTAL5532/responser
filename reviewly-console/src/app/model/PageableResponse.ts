export class PageableResponse<T> {

    totalElements: number;

    totalPages: number;

    currentPageNumber: number;

    currentPageSize: number;

    isLast: boolean;

    data: T[];

    public getFirst = (): T => {
        return this.data[0]
    }

    public static deserialize<T>(data: any, dataList: T[]): PageableResponse<T> {
        return Object.assign(new PageableResponse<T>(), data, {
            data: dataList
        });
    }
}
