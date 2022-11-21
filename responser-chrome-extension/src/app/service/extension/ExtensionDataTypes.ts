export enum ExtensionMessageType {
    SET_TOKEN = "SET_TOKEN",
    REMOVE_TOKEN = "REMOVE_TOKEN",
    GET_TOKEN = "GET_TOKEN",
    OPEN_EXTERNAL_PAGE = "OPEN_EXTERNAL_PAGE",
    GET_CURRENT_PAGE_INFO = "GET_CURRENT_PAGE_INFO",
}

export class ExtensionMessage<T = any> {

    type: ExtensionMessageType;

    data: T;

    constructor(type: ExtensionMessageType, data?: T) {
        this.type = type;
        this.data = data;
    }
}

export type ExtensionResponse<T = any> = {
    success: boolean;
    message?: string;
    data: T
}
