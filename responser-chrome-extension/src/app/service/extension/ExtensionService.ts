import {useState} from "react";
import {ExtensionMessage, ExtensionMessageType, ExtensionResponse} from "./ExtensionDataTypes";
import {TokenInfo} from "../../model/TokenInfo";
import ApplicationProperties from "../ApplicationProperties";
import {PageInfo} from "../../model/PageInfo";

export class ExtensionService {

    getToken = (): Promise<ExtensionResponse<TokenInfo>> => {
        const message = new ExtensionMessage(ExtensionMessageType.GET_TOKEN);
        return this.sendMessage<any, TokenInfo>(message);
    }

    setToken = (tokenData: TokenInfo): Promise<ExtensionResponse> => {
        const message = new ExtensionMessage<TokenInfo>(ExtensionMessageType.SET_TOKEN, tokenData);
        return this.sendMessage(message);
    }

    removeToken = (): Promise<ExtensionResponse> => {
        const message = new ExtensionMessage(ExtensionMessageType.REMOVE_TOKEN);
        return this.sendMessage(message);
    }

    getCurrentPageInfo = async (): Promise<ExtensionResponse<PageInfo>> => {
        const message = new ExtensionMessage(ExtensionMessageType.GET_CURRENT_PAGE_INFO);
        let data;
        try {
            data = await this.sendMessage(message);
        }catch (error) {
            console.error(error)
        }
        return data;
    }

    openLoginPage = (): Promise<ExtensionResponse> => {
        return this.openExternalPage(ApplicationProperties.loginExtensionPage);
    }

    openLogoutPage = (): Promise<ExtensionResponse> => {
        return this.openExternalPage(ApplicationProperties.logoutExtensionPage);
    }

    openExternalPage = (url: string): Promise<ExtensionResponse> => {
        const message = new ExtensionMessage<string>(ExtensionMessageType.OPEN_EXTERNAL_PAGE, url);
        return this.sendMessage(message);
    }

    sendMessage = <M = any, R = any>(message: ExtensionMessage<M>) => {
        console.debug("[POP UP] ExtensionService.sendMessage:", message);
        return new Promise<ExtensionResponse>((resolve, reject) => {

            if (!chrome.runtime) {
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
