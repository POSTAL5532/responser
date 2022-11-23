import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useResponsesPageStore} from "./ResponsesPageStore";
import {Response} from "../../model/Response";
import {Domain} from "../../model/Domain";
import {Resource} from "../../model/Resource";

export const RESPONSES_PAGE_URL = "/responses"

const ResponsesPage: React.FC = () => {
    const responsesPageStore = useResponsesPageStore();
    const {domain, resource, responses, init} = responsesPageStore;

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="responses-page">
            <div className="header">
                {domain ? <DomainCard domain={domain}/> : "LOADING..."}
                {resource ? <ResourceCard resource={resource}/> : "LOADING..."}
            </div>
            <div className="responses">
                {responses.map(response => <ResponseCard response={response}/>)}
            </div>
        </div>
    );
}

export default observer(ResponsesPage);

type DomainCardProps = {
    domain: Domain;
}

const DomainCard: React.FC<DomainCardProps> = (props: DomainCardProps) => {

    return (
        <div className="domain">
            <div className="domain">{props.domain.domain}</div>
        </div>
    );
}

type ResourceCardProps = {
    resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = (props: ResourceCardProps) => {
    return (
        <div className="resource">
            <div className="page">Page:</div>
            <div className="description">{props.resource.description}</div>
        </div>
    );
}

type ResponseCardProps = {
    response: Response;
}

const ResponseCard: React.FC<ResponseCardProps> = (props: ResponseCardProps) => {
    const {response: {user, rating, text, creationDate}} = props;

    return (
        <div className="response">
            <div className="user-name">{user.firstName} {user.lastName}</div>
            <div className="rating">{rating}</div>
            <div className="text">{text}</div>
            <div className="published">{creationDate.toString()}</div>
        </div>
    );
}
