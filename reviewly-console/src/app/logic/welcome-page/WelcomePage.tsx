import React, {useContext} from "react";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import {observer} from "mobx-react";


export const WELCOME_PAGE_URL = "/";

const WelcomePage: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);

    return (
        <div>
            Welcome page!
            <br/>
            {
                !!currentUser
                    ? `Current user email is ${currentUser.email}`
                    : <a href={AuthorizationService.getLoginPagePreparedUrl()}>Login</a>
            }
        </div>
    );
}

export default observer(WelcomePage);
