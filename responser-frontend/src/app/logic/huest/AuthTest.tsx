import React, {Component} from "react";
import {observer} from "mobx-react";
import {Page} from "app/components/page/Page";
import {ExtensionService} from "../../service/extension/ExtensionService";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";

export const TEST_PAGE_URL: string = "/test";

@observer
export class AuthTest extends Component {

    extensionService: ExtensionService = new ExtensionService();

    async componentDidMount() {
        const response = await this.extensionService.setToken(LocalTokenStorageService.tokenInfo);
        console.debug(response);
    }

    render() {
        return (
            <Page tabTitle="Test" className="test-page">
                SOME TEST!!!!!!!!!!!!!!!!!!!!!!!!1
            </Page>
        );
    }

}