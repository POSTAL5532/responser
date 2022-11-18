import React from "react";
import {observer} from "mobx-react";

export const RESPONSES_PAGE_URL = "/responses"

const ResponsesPage: React.FC = () => {

    let responses = [];

    for (let i = 0; i < 10; i++) {
        responses.push(<Response key={i}/>);
    }

    return(
        <div className="responses-page">
            <div className="header">
                <div className="domain">
                    <div className="name">some-domain.com</div>
                    <div className="description">Some domain description</div>
                </div>
                <div className="resource">
                    <div className="name">Som name of resource</div>
                </div>
            </div>
            <div className="responses">
                {responses}
            </div>
        </div>
    );
}

export default observer(ResponsesPage);

const Response: React.FC = () => {
    return (
        <div className="response">
            <div className="user-name">Some User</div>
            <div className="rating">***</div>
            <div className="text">Som respoooonse of this resource</div>
            <div className="published">05-09-1991</div>
        </div>
    );
}
