import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Button, ButtonType} from "app/components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {nativeNavigateTo, navigateTo} from "../../utils/NavigationUtils";
import ApplicationProperties from "../../service/ApplicationProperties";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import {Icon, IconType} from "../../components/icon/Icon";
import {MAIN_PAGE_URL} from "../main-page/MainPage";
import "./AppHeader.less";

const AppHeader: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);

    return (
        <header className="header">
            <div className="header-content">
                <nav className="navigation">
                    <Button styleType={ButtonType.LIGHT} onClick={() => nativeNavigateTo(ApplicationProperties.landingPageUrl)}>Home</Button>
                    <Button styleType={ButtonType.LIGHT} onClick={() => nativeNavigateTo(ApplicationProperties.landingPageUrl + "/web-resources/sites-rating")}>
                        Sites rating
                    </Button>
                    <Button styleType={ButtonType.LIGHT} onClick={() => nativeNavigateTo(ApplicationProperties.landingPageUrl + "/reviews/see-reviews")}>
                        Reviews
                    </Button>
                </nav>
                <div className="logo-container">
                    <a className="logo-link" href={ApplicationProperties.landingPageUrl}>
                        <Icon type={IconType.REVIEWLY}/>
                    </a>
                </div>
                <div className="right-control-container">
                    <Button onClick={() => nativeNavigateTo("https://www.google.com")}>
                        <Icon type={IconType.CHROME_LOGO}/>
                        Download for chrome
                    </Button>

                    {
                        !!currentUser
                            ? <Button styleType={ButtonType.PRIMARY} onClick={() => navigateTo(MAIN_PAGE_URL)}>
                                <Icon type={IconType.USER}/>
                            </Button>
                            : <Button styleType={ButtonType.PRIMARY} onClick={AuthorizationService.requestLoginPage}>
                                <Icon type={IconType.LOGIN}/>
                                Login
                            </Button>
                    }
                </div>
            </div>
        </header>
    );
}

export default observer(AppHeader);
