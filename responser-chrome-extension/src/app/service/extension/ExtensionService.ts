import {useState} from "react";
import {ExtensionMessage, ExtensionMessageType, ExtensionResponse} from "./ExtensionDataTypes";
import {TokenInfo} from "../../model/TokenInfo";
import ApplicationProperties from "../ApplicationProperties";
import {PageInfo} from "../../model/PageInfo";
import {Logger} from "../../utils/Logger";

export class ExtensionService {

    logger: Logger = new Logger("ExtensionService");

    getToken = (): Promise<ExtensionResponse<TokenInfo>> => {
        this.logger.debug("Get token - start");
        const message = new ExtensionMessage(ExtensionMessageType.GET_TOKEN);
        this.logger.debug("Get token - finish");
        return this.sendMessage<any, TokenInfo>(message);
    }

    setToken = (tokenData: TokenInfo): Promise<ExtensionResponse> => {
        this.logger.debug("Set token - start");
        const message = new ExtensionMessage<TokenInfo>(ExtensionMessageType.SET_TOKEN, tokenData);
        this.logger.debug("Set token - finish");
        return this.sendMessage(message);
    }

    removeToken = (): Promise<ExtensionResponse> => {
        this.logger.debug("Remove token - start");
        const message = new ExtensionMessage(ExtensionMessageType.REMOVE_TOKEN);
        this.logger.debug("Remove token - finish");
        return this.sendMessage(message);
    }

    getCurrentPageInfo = async (): Promise<ExtensionResponse<PageInfo>> => {
        this.logger.debug("Get current page info - start");
        const message = new ExtensionMessage(ExtensionMessageType.GET_CURRENT_PAGE_INFO);
        let data;

        try {
            data = await this.sendMessage(message);
        }catch (error) {
            this.logger.debug("Get current page info - error:", error);
        }

        this.logger.debug("Get current page info - finish");

        return data;
    }

    openLoginPage = (): Promise<ExtensionResponse> => {
        this.logger.debug("Open login page");
        return this.openExternalPage(ApplicationProperties.loginExtensionPage);
    }

    openLogoutPage = (): Promise<ExtensionResponse> => {
        this.logger.debug("Open logout page");
        return this.openExternalPage(ApplicationProperties.logoutExtensionPage);
    }

    openExternalPage = (url: string): Promise<ExtensionResponse> => {
        const message = new ExtensionMessage<string>(ExtensionMessageType.OPEN_EXTERNAL_PAGE, url);
        return this.sendMessage(message);
    }

    sendMessage = <M = any, R = any>(message: ExtensionMessage<M>) => {
        this.logger.debug("Send message to background:", message);
        return new Promise<ExtensionResponse>((resolve, reject) => {

            if (!chrome.runtime) {
                this.logger.warning("Chrome runtime is not defined!");
                reject("Chrome runtime is not defined!")
            }

            chrome.runtime.sendMessage<ExtensionMessage<M>, ExtensionResponse<R>>(
                message,
                response => response.success ? resolve(response) : reject(response.message)
            );
        });
    }
}

export const useExtensionService = (): ExtensionService => {
    const [extensionService] = useState(new ExtensionService());
    return extensionService;
}
