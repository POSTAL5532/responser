import {Response} from "../../model/Response";
import React, {useContext} from "react";
import {observer} from "mobx-react";
import classNames from "classnames";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Rating} from "../../components/rating/Rating";
import "./ResponsesList.less";

type ResponsesListProps = {
    responses: Response[];
}

const ResponsesList: React.FC<ResponsesListProps> = (props: ResponsesListProps) => {
    const context = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {responses} = props;

    const responsesCardsList = (response: Response) => {
        const isCurrentUserResponse = response.user.id === context.currentUser?.id;
        return <ResponseCard response={response} isCurrentUserResponse={isCurrentUserResponse}/>;
    }

    return (
        <div className="responses">
            {responses.map(responsesCardsList)}
        </div>
    );
}

export default observer(ResponsesList)

type ResponseCardProps = {
    response: Response;
    isCurrentUserResponse: boolean;
}

const ResponseCard: React.FC<ResponseCardProps> = (props: ResponseCardProps) => {
    const {response: {user, rating, text, creationDate}, isCurrentUserResponse} = props;
    const className = classNames("response", {"current-user": isCurrentUserResponse});

    return (
        <div className={className}>
            <div className="user-name">{user.firstName} {user.lastName} {isCurrentUserResponse ? "(you)" : null}</div>
            <div className="rating-container"><Rating value={rating} readonly={true}/></div>
            <div className="text">{text}</div>
            <div className="published">{creationDate.toString()}</div>
        </div>
    );
}