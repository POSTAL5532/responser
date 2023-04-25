import ApplicationProperties from "../ApplicationProperties";
import {ExtensionMessage, ExtensionMessageType, ExtensionResponse} from "./ExtensionDataTypes";
import {TokenInfo} from "../../model/TokenInfo";
import {useState} from "react";
import LocalTokenStorageService from "../authorization/LocalTokenStorageService";
import {Logger} from "../../utils/Logger";

export class ExtensionService {

    logger: Logger = new Logger("ExtensionService");

    public static readonly CHROME_RUNTIME_NOT_DEFINED: string = "Chrome runtime is not defined!";

    checkExtension = (): Promise<ExtensionResponse> => {
        this.logger.debug("Check extension - start");

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
        })
        .catch(error => {
            this.logger.error("Check extension - error", error);
            throw error;
        })
        .finally(() => {
            this.logger.debug("Check extension - finish")
        });
    }

    setToken = (tokenData: TokenInfo = LocalTokenStorageService.tokenInfo): Promise<ExtensionResponse> => {
        this.logger.debug("Set token - start");

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
        })
        .catch(error => {
            this.logger.error("Set token - error", error);
            throw error;
        })
        .finally(() => {
            this.logger.debug("Set token - finish")
        });
    }

    removeToken = (): Promise<ExtensionResponse> => {
        this.logger.debug("Remove token - start");

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
        })
        .catch(error => {
            this.logger.error("Remove token - error", error);
            throw error;
        })
        .finally(() => {
            this.logger.debug("Remove token - finish")
        });
    }
}

export const useExtensionService = (): ExtensionService => {
    const [extensionService] = useState(new ExtensionService());
    return extensionService;
}
