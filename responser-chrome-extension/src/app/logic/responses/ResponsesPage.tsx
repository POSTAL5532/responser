import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {useResponsesPageStore} from "./ResponsesPageStore";
import {Domain} from "../../model/Domain";
import ResponsesList from "./ResponsesList";
import {Button} from "../../components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Page} from "../../components/page/Page";
import {navigateTo} from "../../utils/NavigationUtils";
import {getNewResponsePageUrl} from "../edit-response/EditResponsePage";
import "./ResponsesPage.less";

export const RESPONSES_PAGE_URL = "/responses";

const ResponsesPage: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {domain, resource, responses, init} = useResponsesPageStore();

    useEffect(() => {
        init();
    }, []);

    const onLeaveResponseClick = () => {
        navigateTo(getNewResponsePageUrl(resource.id));
    }

    return (
        <Page className="responses-page">
            <div className="header">
                {domain ? <DomainCard domain={domain}/> : "LOADING..."}
            </div>
            <ResponsesList responses={responses}/>

            <div className="leave-response-container">
                <Button disabled={!currentUser} onClick={currentUser ? onLeaveResponseClick : undefined}>
                    {currentUser ? "Leave response" : "SignIn for responding"}
                </Button>
            </div>
        </Page>
    );
}

export default observer(ResponsesPage);

type DomainCardProps = {
    domain: Domain;
}

const DomainCard: React.FC<DomainCardProps> = (props: DomainCardProps) => (
    <div className="domain">{props.domain.domain}</div>
);
