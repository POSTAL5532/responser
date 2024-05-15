import {IconType} from "../../components/icon/Icon";
import {ButtonType} from "../../components/button/Button";
import {ReactNode} from "react";

export class GlobalNotification {

    name: string;

    text: ReactNode;

    actions: GlobalNotificationAction[] = [];

    onClose: () => void = () => {localStorage.setItem(this.name, "done")}
}

export class GlobalNotificationAction {

    icon: IconType;

    text: string;

    onAction: () => void;

    styleType: ButtonType;
}
