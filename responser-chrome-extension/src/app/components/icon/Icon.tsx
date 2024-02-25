import React from "react";
import classNames from "classnames";
import {ReactComponent as Cancel} from './cancel.svg';
import {ReactComponent as Delete} from './delete.svg';
import {ReactComponent as Edit} from './edit.svg';
import {ReactComponent as Login} from './login.svg';
import {ReactComponent as Plus} from './plus.svg';
import {ReactComponent as Sandwich} from './sandwich.svg';
import {ReactComponent as Check} from './check.svg';
import {ReactComponent as Empty} from './empty.svg';
import {ReactComponent as Reviewly} from './reviewly.svg';
import {ReactComponent as Star} from './star.svg';
import "./Icon.less";

export enum IconType {
    CANCEL = "cancel",
    DELETE = "delete",
    EDIT = "edit",
    LOGIN = "login",
    LOGOUT = "logout",
    PLUS = "plus",
    SANDWICH = "sandwich",
    CHECK = "check",
    EMPTY = "empty",
    REVIEWLY = "reviewly",
    STAR = "star",
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
        case IconType.EMPTY:
            return <Empty className={resultClassName}/>
        case IconType.REVIEWLY:
            return <Reviewly className={resultClassName}/>
        case IconType.STAR:
            return <Star className={resultClassName}/>
        default:
            return null;
    }
}
