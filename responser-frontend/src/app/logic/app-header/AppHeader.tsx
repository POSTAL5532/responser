import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Button, ButtonType} from "app/components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {nativeNavigateTo, navigateTo} from "../../utils/NavigationUtils";
import ApplicationProperties from "../../service/ApplicationProperties";
import {USER_PROFILE_PAGE_URL} from "../user-profile/UserProfilePage";
import AuthorizationService from "../../service/authorization/AuthorizationService";
import "./AppHeader.less";

const AppHeader: React.FC = () => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);

    return (
        <header className="header">
            <div className="header-content">
                <nav className="navigation">
                    <Button styleType={ButtonType.LIGHT} onClick={() => nativeNavigateTo(ApplicationProperties.landingPageUrl)}>Home</Button>
                    <Button styleType={ButtonType.LIGHT} onClick={() => nativeNavigateTo(ApplicationProperties.landingPageUrl)}>Sites rating</Button>
                    <Button styleType={ButtonType.LIGHT} onClick={() => nativeNavigateTo(ApplicationProperties.landingPageUrl)}>Reviews</Button>
                </nav>
                <div className="logo-container">
                    <a className="logo-link" href={ApplicationProperties.landingPageUrl}>
                        <svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon logo">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M0.09375 2.60318C0.09375 1.58353 0.869152 0.749268 1.81687 0.749268H11.3514C12.5289 0.749268 13.3617 2.01611 12.9597 3.22116L9.94423 12.2435C9.54217 13.4486 10.375 14.7154 11.5525 14.7154H26.2564C27.2041 14.7154 27.9795 15.5497 27.9795 16.5694V28.9288C27.9795 29.9484 27.2041 30.7827 26.2564 30.7827H25.3661C24.9641 30.7827 24.562 30.6282 24.2748 30.3501L10.4899 17.9289C9.57089 17.0946 8.19239 17.4963 7.79033 18.7323L4.17179 29.5777C3.91332 30.3192 3.28151 30.7827 2.56355 30.7827H1.81687C0.869152 30.7827 0.09375 29.9484 0.09375 28.9288L0.09375 2.60318ZM18.5885 7.11438C18.1865 8.31942 19.0193 9.58627 20.1968 9.58627H26.2564C27.2041 9.58627 27.9795 8.752 27.9795 7.73235V2.60318C27.9795 1.58353 27.2041 0.749268 26.2564 0.749268H21.9199C21.2019 0.749268 20.5701 1.24365 20.3116 1.95431L18.5885 7.08348V7.11438Z"
                                  fill="#404038"/>
                        </svg>
                    </a>
                </div>
                <div className="right-control-container">
                    <Button onClick={() => nativeNavigateTo("https://www.google.com")}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon chrome">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M4.09176 4.59337C5.32978 3.1465 7.16913 2.22949 9.22266 2.22949C11.563 2.22949 13.6252 3.42057 14.8361 5.22962H9.22315C7.67588 5.22962 6.34749 6.16669 5.77451 7.50427L4.09176 4.59337ZM2.6224 4.02902C2.59431 4.06095 2.56922 4.09498 2.54724 4.13069C1.55688 5.49179 0.972656 7.16741 0.972656 8.97949C0.972656 13.206 4.15086 16.6902 8.24771 17.1725C8.28249 17.1789 8.31747 17.1827 8.3524 17.1841C8.63839 17.2141 8.92873 17.2295 9.22266 17.2295C13.779 17.2295 17.4727 13.5358 17.4727 8.97949C17.4727 7.82596 17.2359 6.72773 16.8084 5.73072C16.7961 5.69599 16.7814 5.66243 16.7645 5.63025C15.4803 2.74283 12.5866 0.729492 9.22266 0.729492C6.52377 0.729492 4.12756 2.02545 2.6224 4.02902ZM15.5886 6.72962H12.2234C12.6942 7.35636 12.9731 8.13541 12.9731 8.97962C12.9731 9.71695 12.7603 10.4046 12.3928 10.9844L9.66393 15.7153C13.1862 15.488 15.9727 12.5592 15.9727 8.97949C15.9727 8.19061 15.8373 7.43333 15.5886 6.72962ZM7.98897 15.617L9.66967 12.7033C9.52325 12.7207 9.37424 12.7296 9.22315 12.7296C7.77822 12.7296 6.52417 11.9124 5.89797 10.715L3.16791 5.99238C2.72279 6.89289 2.47266 7.90698 2.47266 8.97949C2.47266 12.2861 4.85018 15.0373 7.98897 15.617ZM11.1685 10.1049C11.1786 10.0875 11.1892 10.0706 11.2004 10.0543C11.3743 9.735 11.4731 9.36885 11.4731 8.97962C11.4731 7.73698 10.4658 6.72962 9.22315 6.72962C7.98051 6.72962 6.97315 7.73698 6.97315 8.97962C6.97315 9.34712 7.06125 9.69404 7.21749 10.0004L7.27748 10.1042C7.2874 10.1213 7.29656 10.1387 7.30498 10.1563C7.70083 10.8002 8.41184 11.2296 9.22315 11.2296C10.0153 11.2296 10.7119 10.8202 11.1128 10.2015L11.1685 10.1049Z"
                                  fill="black" fill-opacity="0.6"/>
                        </svg>
                        Download for chrome
                    </Button>

                    {
                        !!currentUser
                            ? <Button styleType={ButtonType.PRIMARY} onClick={() => navigateTo(USER_PROFILE_PAGE_URL)}>
                                <svg className="icon user" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.0034 16.25V14.75C15.0034 13.9544 14.6873 13.1913 14.1247 12.6287C13.5621 12.0661 12.7991 11.75 12.0034 11.75H6.00342C5.20777 11.75 4.44471 12.0661 3.8821 12.6287C3.31949 13.1913 3.00342 13.9544 3.00342 14.75V16.25"
                                        stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path
                                        d="M8.99658 8.75C10.6534 8.75 11.9966 7.40685 11.9966 5.75C11.9966 4.09315 10.6534 2.75 8.99658 2.75C7.33973 2.75 5.99658 4.09315 5.99658 5.75C5.99658 7.40685 7.33973 8.75 8.99658 8.75Z"
                                        stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </Button>
                            : <Button styleType={ButtonType.PRIMARY} onClick={AuthorizationService.requestLoginPage}>
                                <svg className="icon login" xmlns="http://www.w3.org/2000/svg" width="11.49996" height="11.49995" viewBox="0 0 11.49996 11.49995" fill="none" version="1.1" id="svg8">
                                    <path
                                        d="m 7.5,0.5 h 2.33336 c 0.3094,0 0.6061,0.12291 0.8249,0.3417 0.2188,0.2188 0.3417,0.51554 0.3417,0.82496 v 8.16669 c 0,0.3094 -0.1229,0.6061 -0.3417,0.8249 -0.2188,0.2188 -0.5155,0.3417 -0.8249,0.3417 H 7.5"
                                        stroke="#000000" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" id="path2"/>
                                    <path d="M 4.58398,8.66685 7.50065,5.75016 4.58398,2.83349" stroke="#000000" stroke-opacity="0.6" stroke-linecap="round"
                                          stroke-linejoin="round" id="path4"/>
                                    <path d="m 7.5,5.75 h -7" stroke="#000000" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" id="path6"/>
                                </svg>
                                Login
                            </Button>
                    }
                </div>
            </div>
        </header>
    );
}

export default observer(AppHeader);
