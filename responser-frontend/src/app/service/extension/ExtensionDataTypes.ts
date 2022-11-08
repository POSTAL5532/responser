export enum ExtensionMessageType {
    SET_TOKEN = "SET_TOKEN",
    REMOVE_TOKEN = "REMOVE_TOKEN",
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
