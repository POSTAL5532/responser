import ApplicationProperties from "../ApplicationProperties";
import {ExtensionMessage, ExtensionMessageType, ExtensionResponse} from "./ExtensionDataTypes";
import {TokenInfo} from "../../model/TokenInfo";
import {useState} from "react";
import LocalTokenStorageService from "../authorization/LocalTokenStorageService";

export class ExtensionService {

    public static readonly CHROME_RUNTIME_NOT_DEFINED: string = "Chrome runtime is not defined!";

    checkExtension = (): Promise<ExtensionResponse> => {
        return new Promise<ExtensionResponse>((resolve, reject) => {
            const message = new ExtensionMessage<TokenInfo>(ExtensionMessageType.CHECK_EXTENSION);

            if (!chrome.runtime) {
                reject(ExtensionService.CHROME_RUNTIME_NOT_DEFINED)
            }

            chrome.runtime.sendMessage<ExtensionMessage<TokenInfo>, ExtensionResponse>(
                ApplicationProperties.chromeExtensionId,
                message,
                response => response.success ? resolve(response) : reject()
            );
        });
    }

    setToken = (tokenData: TokenInfo = LocalTokenStorageService.tokenInfo): Promise<ExtensionResponse> => {
        return new Promise<ExtensionResponse>((resolve, reject) => {
            const message = new ExtensionMessage<TokenInfo>(ExtensionMessageType.SET_TOKEN, tokenData);

            if (!chrome.runtime) {
                reject(ExtensionService.CHROME_RUNTIME_NOT_DEFINED)
            }

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

            if (!chrome.runtime) {
                reject(ExtensionService.CHROME_RUNTIME_NOT_DEFINED)
            }

            chrome.runtime.sendMessage<ExtensionMessage, ExtensionResponse>(
                ApplicationProperties.chromeExtensionId,
                message,
                response => response.success ? resolve(response) : reject()
            );
        });
    }
}

export const useExtensionService = (): ExtensionService => {
    const [extensionService] = useState(new ExtensionService());
    return extensionService;
}
