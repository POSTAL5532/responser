import React from "react";
import classNames from "classnames";
import {ReactComponent as Cancel} from './cancel.svg';
import {ReactComponent as Delete} from './delete.svg';
import {ReactComponent as Edit} from './edit.svg';
import {ReactComponent as Login} from './login.svg';
import {ReactComponent as Plus} from './plus.svg';
import {ReactComponent as Sandwich} from './sandwich.svg';
import {ReactComponent as Check} from './check.svg';
import {ReactComponent as CircleCheck} from './circle_check.svg';
import {ReactComponent as Empty} from './empty.svg';
import {ReactComponent as Verified} from './verified.svg';
import {ReactComponent as Alert} from './alert.svg';
import {ReactComponent as ReviewlyLogo} from './reviewly_log.svg';
import {ReactComponent as User} from './user.svg';
import {ReactComponent as SpinnerCircle} from './spinner-circle.svg';
import "./Icon.less";

export enum IconType {
    CANCEL = "CANCEL",
    DELETE = "DELETE",
    EDIT = "EDIT",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    PLUS = "PLUS",
    SANDWICH = "SANDWICH",
    CHECK = "CHECK",
    CIRCLE_CHECK = "CIRCLE_CHECK",
    EMPTY = "EMPTY",
    VERIFIED = "VERIFIED",
    ALERT = "ALERT",
    REVIEWLY_LOGO = "REVIEWLY_LOGO",
    USER = "USER",
    SPINNER_CIRCLE = "SPINNER_CIRCLE",
}

type IconProps = {
    type: IconType;
    className?: string;
}

export const Icon: React.FC<IconProps> = (props: IconProps) => {
    const {type, className} = props;
    const resultClassName = classNames("icon", type.toLowerCase(), className);

    switch (props.type) {
        case IconType.CANCEL:
            return <Cancel className={resultClassName}/>
        case IconType.DELETE:
            return <Delete className={resultClassName}/>
        case IconType.EDIT:
            return <Edit className={resultClassName}/>
        case IconType.LOGIN:
            return <Login className={resultClassName}/>
        case IconType.LOGOUT:
            return <Login className={resultClassName}/>
        case IconType.PLUS:
            return <Plus className={resultClassName}/>
        case IconType.SANDWICH:
            return <Sandwich className={resultClassName}/>
        case IconType.CHECK:
            return <Check className={resultClassName}/>
        case IconType.CIRCLE_CHECK:
            return <CircleCheck className={resultClassName}/>
        case IconType.EMPTY:
            return <Empty className={resultClassName}/>
        case IconType.VERIFIED:
            return <Verified className={resultClassName}/>
        case IconType.ALERT:
            return <Alert className={resultClassName}/>
        case IconType.REVIEWLY_LOGO:
            return <ReviewlyLogo className={resultClassName}/>
        case IconType.USER:
            return <User className={resultClassName}/>
        case IconType.SPINNER_CIRCLE:
            return <SpinnerCircle className={resultClassName}/>
        default:
            return null;
    }
}
