import React, {useContext} from "react";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import {observer} from "mobx-react";
import Title from "antd/lib/typography/Title";
import {Button, Card} from "antd";
import Meta from "antd/lib/card/Meta";


export const WELCOME_PAGE_URL = "/";

const WelcomePage: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);

    if (!currentUser) {
        return (
            <div>
                <Title level={4}>Welcome to Reviewly admin console!</Title>
                <Button type="primary" onClick={AuthorizationService.requestLoginPage}>
                    Please login
                </Button>
            </div>
        );
    }

    return (
        <Card>
            <Meta
                title={currentUser.fullName}
                description={currentUser.email}/>
        </Card>
    );
}

export default observer(WelcomePage);
