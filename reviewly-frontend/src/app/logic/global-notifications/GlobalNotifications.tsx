import React, {useContext} from "react";
import {observer} from "mobx-react";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {GlobalNotification} from "../../model/notifications/GlobalNotification";
import {Icon, IconType} from "../../components/icon/Icon";
import {Button, ButtonSize} from "../../components/button/Button";
import {ConditionShow} from "../../components/ConditionShow";
import "./GlobalNotifications.less";

const GlobalNotifications: React.FC = () => {
    const {globalNotificationsHolder} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {notifications} = globalNotificationsHolder;

    if (notifications.size <= 0) {
        return null;
    }

    const mapNotifications = () => {
        let notificationsArray = Array.from(notifications, ([name, value]) => (value));
        return notificationsArray.map(notification => <GlobalNotificationBlock notification={notification} key={notification.name}/>)
    }

    return (
        <div className="global-notifications">
            {mapNotifications()}
        </div>
    );
}

export default observer(GlobalNotifications);

type GlobalNotificationBlockProps = {
    notification: GlobalNotification;
}
const GlobalNotificationBlock: React.FC<GlobalNotificationBlockProps> = (props: GlobalNotificationBlockProps) => {
    const {notification} = props;

    const mapActions = () => {
        return notification.actions.map((action, index) => (
            <Button onClick={action.onAction} styleType={action.styleType} size={ButtonSize.SMALL} key={index}>
                <ConditionShow condition={!!action.icon}>
                    <Icon type={action.icon}/>
                </ConditionShow>
                {action.text}
            </Button>
        ));
    }

    return (
        <div className="notification-block">
            <button onClick={notification.onClose} className="close-notification">
                <Icon type={IconType.CLOSE}/>
            </button>

            <p className="notification-text">
                {notification.text}
            </p>

            <div className="notification-actions">
                {mapActions()}
            </div>
        </div>
    );
}
