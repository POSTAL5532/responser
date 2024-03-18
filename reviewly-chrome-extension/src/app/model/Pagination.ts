export class Pagination {

    public static readonly SINGLE_ELEMENT = new Pagination(0, 1);

    pageNumber: number;

    pageSize: number;

    constructor(pageNumber: number, pageSize: number) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }

    public static of = (pageNumber: number, pageSize: number): Pagination => {
        return new Pagination(pageNumber, pageSize)
    }
}
