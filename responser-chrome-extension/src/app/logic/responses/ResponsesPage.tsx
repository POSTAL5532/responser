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
        init("https://gidonline.io/film/robot-po-imeni-chappi")
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
    const {domain: {domain, name, description}} = props;

    return (
        <div className="domain">
            <div className="name">{name}</div>
            <div className="domain">{domain}</div>
            <div className="description">{description}</div>
        </div>
    );
}

type ResourceCardProps = {
    resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = (props: ResourceCardProps) => {
    const {resource: {name, description}} = props;

    return (
        <div className="resource">
            <div className="name">{name}</div>
            <div className="description">{description}</div>
        </div>
    );
}

type ResponseCardProps = {
    response: Response;
}

const ResponseCard: React.FC<ResponseCardProps> = (props: ResponseCardProps) => {
    const {response: {user, rating, text, creationDate, updateDate}} = props;

    return (
        <div className="response">
            <div className="user-name">{user.firstName} {user.lastName}</div>
            <div className="rating">{rating}</div>
            <div className="text">{text}</div>
            <div className="published">{creationDate.toString()}</div>
        </div>
    );
}
