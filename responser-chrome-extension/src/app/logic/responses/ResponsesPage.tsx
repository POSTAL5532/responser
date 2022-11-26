import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useResponsesPageStore} from "./ResponsesPageStore";
import {Domain} from "../../model/Domain";
import ResponsesList from "./ResponsesList";
import "./ResponsesPage.less"

export const RESPONSES_PAGE_URL = "/responses"

const ResponsesPage: React.FC = () => {
    const responsesPageStore = useResponsesPageStore();
    const {domain, responses, init} = responsesPageStore;

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="responses-page">
            <div className="header">
                {domain ? <DomainCard domain={domain}/> : "LOADING..."}
            </div>
            <ResponsesList responses={responses}/>
        </div>
    );
}

export default observer(ResponsesPage);

type DomainCardProps = {
    domain: Domain;
}

const DomainCard: React.FC<DomainCardProps> = (props: DomainCardProps) => (
    <div className="domain">{props.domain.domain}</div>
);
