import {User} from "./User";
import moment from "moment/moment";
import {ReviewLike} from "./ReviewLike";
import {ResourceType} from "./ResourceType";

export class PageableResponse<T> {

    totalElements: number;

    totalPages: number;

    currentPageNumber: number;

    currentPageElements: number;

    isLast: boolean;

    data: T[];

    public static deserialize<T>(data: any, dataList: T[]): PageableResponse<T> {
        return Object.assign(new PageableResponse<T>(), data, {
            data: dataList
        });
    }
}
