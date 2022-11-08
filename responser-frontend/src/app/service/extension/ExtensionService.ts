import ApplicationProperties from "../ApplicationProperties";
import {ExtensionMessage, ExtensionMessageType, ExtensionResponse} from "./ExtensionDataTypes";
import {TokenInfo} from "../../model/TokenInfo";

export class ExtensionService {

    setToken = (tokenData: TokenInfo): Promise<ExtensionResponse> => {
        return new Promise<ExtensionResponse>((resolve, reject) => {
            const message = new ExtensionMessage<TokenInfo>(ExtensionMessageType.SET_TOKEN, tokenData);

            chrome.runtime.sendMessage<ExtensionMessage<TokenInfo>, ExtensionResponse>(
                ApplicationProperties.chromeExtensionId,
                message,
                response => response.success ? resolve(response) : reject()
            );
        });
    }

    removeToken = (): Promise<ExtensionResponse> => {
        return new Promise<ExtensionResponse>((resolve, reject) => {
            const message = new ExtensionMessage(ExtensionMessageType.REMOVE_TOKEN);

            chrome.runtime.sendMessage<ExtensionMessage, ExtensionResponse>(
                ApplicationProperties.chromeExtensionId,
                message,
                response => response.success ? resolve(response) : reject()
            );
        });
    }
}

