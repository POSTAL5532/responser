import React from "react";
import classNames from "classnames";
import {ReactComponent as Delete} from './delete.svg';
import {ReactComponent as Sandwich} from './sandwich.svg';
import {ReactComponent as Empty} from './empty.svg';
import {ReactComponent as Alert} from './alert.svg';
import {ReactComponent as Eye} from './eye.svg';
import {ReactComponent as Star} from './star.svg';
import {ReactComponent as HelpCircle} from './help_circle.svg';
import {ReactComponent as Logout} from './log_out.svg';
import {ReactComponent as Close} from './close.svg';
import {ReactComponent as CircleArrow} from './circle_arrow.svg';
import {ReactComponent as Send} from './send.svg';
import {ReactComponent as ChromeLogo} from './chrome-logo.svg';
import {ReactComponent as User} from './user.svg';
import {ReactComponent as Login} from './login.svg';
import {ReactComponent as Reviewly} from './reviewly.svg';
import {ReactComponent as Play} from './play.svg';
import {ReactComponent as Arrow} from './arrow.svg';
import {ReactComponent as Search} from './search.svg';
import {ReactComponent as Settings1} from './settings_1.svg';
import {ReactComponent as Edit} from './edit.svg';
import {ReactComponent as ExternalLink} from './external-link.svg';
import {ReactComponent as Check} from './check.svg';
import "./Icon.less";

export enum IconType {
    REMOVE = "remove",
    LOGOUT = "logout",
    SANDWICH = "sandwich",
    EMPTY = "empty",
    ALERT = "alert",
    REVIEWLY = "reviewly",
    EYE = "eye",
    STAR = "star",
    HELP_CIRCLE = "help-circle",
    CLOSE = "close",
    CIRCLE_ARROW = "circle-arrow",
    SEND = "send",
    CHROME_LOGO = "chrome-logo",
    USER = "user",
    LOGIN = "login",
    PLAY = "play",
    ARROW = "arrow",
    SEARCH = "search",
    SETTINGS_1 = "settings-1",
    EDIT = "edit",
    EXTERNAL_LINK = "external-link",
    CHECK = "check",
}

type IconProps = {
    type: IconType;
    className?: string;
}

export const Icon: React.FC<IconProps> = (props: IconProps) => {
    const {type, className} = props;
    const resultClassName = classNames("icon", type, className);

    switch (props.type) {
        case IconType.REMOVE:
            return <Delete className={resultClassName}/>
        case IconType.LOGOUT:
            return <Logout className={resultClassName}/>
        case IconType.SANDWICH:
            return <Sandwich className={resultClassName}/>
        case IconType.EMPTY:
            return <Empty className={resultClassName}/>
        case IconType.ALERT:
            return <Alert className={resultClassName}/>
        case IconType.EYE:
            return <Eye className={resultClassName}/>
        case IconType.STAR:
            return <Star className={resultClassName}/>
        case IconType.HELP_CIRCLE:
            return <HelpCircle className={resultClassName}/>
        case IconType.CLOSE:
            return <Close className={resultClassName}/>
        case IconType.CIRCLE_ARROW:
            return <CircleArrow className={resultClassName}/>
        case IconType.SEND:
            return <Send className={resultClassName}/>
        case IconType.CHROME_LOGO:
            return <ChromeLogo className={resultClassName}/>
        case IconType.USER:
            return <User className={resultClassName}/>
        case IconType.LOGIN:
            return <Login className={resultClassName}/>
        case IconType.REVIEWLY:
            return <Reviewly className={resultClassName}/>
        case IconType.PLAY:
            return <Play className={resultClassName}/>
        case IconType.ARROW:
            return <Arrow className={resultClassName}/>
        case IconType.SEARCH:
            return <Search className={resultClassName}/>
        case IconType.SETTINGS_1:
            return <Settings1 className={resultClassName}/>
        case IconType.EDIT:
            return <Edit className={resultClassName}/>
        case IconType.EXTERNAL_LINK:
            return <ExternalLink className={resultClassName}/>
        case IconType.CHECK:
            return <Check className={resultClassName}/>
        default:
            return null;
    }
}
