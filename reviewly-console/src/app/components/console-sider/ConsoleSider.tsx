import {Layout, Menu} from "antd";
import {HomeOutlined, LogoutOutlined, QuestionCircleOutlined, TeamOutlined} from "@ant-design/icons";
import {WELCOME_PAGE_URL} from "../../logic/welcome-page/WelcomePage";
import React, {useContext, useState} from "react";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {ConditionShow} from "../ConditionShow";
import {observer} from "mobx-react";
import {USERS_CONTACT_FORMS_URL} from "../../logic/user-contact-froms-page/UsersContactFormsPage";
import {Icon, IconType} from "../icon/Icon";
import LocalTokenStorageService from "../../service/authorization/LocalTokenStorageService";
import {nativeNavigateToAuthLogoutPageUrl, navigateTo} from "../../utils/NavigationUtils";
import {USERS_URL} from "../../logic/users-page/UsersPage";
import "./ConsoleSider.less";

const ConsoleSider: React.FC = props => {
    const {currentUser} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout.Sider collapsible
                      collapsed={collapsed}
                      onCollapse={(value) => setCollapsed(value)}
                      style={{minHeight: '100vh'}}
                      className="console-sider">

            <div className="reviewly-logo">
                <Icon type={IconType.REVIEWLY}/>
            </div>
            <ConditionShow condition={!!currentUser}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={[
                    {
                        key: 1,
                        label: "Home",
                        icon: <HomeOutlined/>,
                        onClick: () => {
                            navigateTo(WELCOME_PAGE_URL);
                        }
                    },
                    {
                        key: 2,
                        label: "Users contact forms",
                        icon: <QuestionCircleOutlined/>,
                        onClick: () => {
                            navigateTo(USERS_CONTACT_FORMS_URL);
                        }
                    },
                    {
                        key: 3,
                        label: "Users",
                        icon: <TeamOutlined/>,
                        onClick: () => {
                            navigateTo(USERS_URL);
                        }
                    },
                    {
                        key: 99,
                        label: "Logout",
                        icon: <LogoutOutlined/>,
                        onClick: () => {
                            LocalTokenStorageService.removeAllTokens();
                            nativeNavigateToAuthLogoutPageUrl();
                        }
                    }
                ]}/>
            </ConditionShow>
        </Layout.Sider>
    )
}

export default observer(ConsoleSider);
