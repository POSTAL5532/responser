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
import {ReactComponent as Send} from './send.svg';
import {ReactComponent as CircleArrow} from './circle_arrow.svg';
import {ReactComponent as Settings} from './settings.svg';
import {ReactComponent as Sorting} from './sorting.svg';
import {ReactComponent as Close} from './close.svg';
import {ReactComponent as Arrow} from './arrow.svg';
import {ReactComponent as FbLogo} from './fb_logo.svg';
import {ReactComponent as TgLogo} from './tg_logo.svg';
import {ReactComponent as XLogo} from './x_logo.svg';
import {ReactComponent as LiLogo} from './li_logo.svg';
import {ReactComponent as VkLogo} from './vk_logo.svg';
import {ReactComponent as RedditLogo} from './reddit_logo.svg';
import {ReactComponent as Clipboard} from './clipboard.svg';
import "./Icon.less";

export enum IconType {
    CANCEL = "cancel",
    REMOVE = "remove",
    EDIT = "edit",
    LOGIN = "login",
    LOGOUT = "logout",
    PLUS = "plus",
    SANDWICH = "sandwich",
    CHECK = "check",
    EMPTY = "empty",
    REVIEWLY = "reviewly",
    STAR = "star",
    SEND = "send",
    CIRCLE_ARROW = "circle-arrow",
    SETTINGS = "settings",
    SORTING = "sorting",
    CLOSE = "close",
    ARROW = "arrow",
    FB_LOGO = "fb-logo",
    X_LOGO = "x-logo",
    TG_LOGO = "tg-logo",
    LI_LOGO = "li-logo",
    VK_LOGO = "vk-logo",
    REDDIT_LOGO = "reddit-logo",
    CLIPBOARD = "clipboard",
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
        case IconType.REMOVE:
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
        case IconType.SEND:
            return <Send className={resultClassName}/>
        case IconType.CIRCLE_ARROW:
            return <CircleArrow className={resultClassName}/>
        case IconType.SETTINGS:
            return <Settings className={resultClassName}/>
        case IconType.SORTING:
            return <Sorting className={resultClassName}/>
        case IconType.CLOSE:
            return <Close className={resultClassName}/>
        case IconType.ARROW:
            return <Arrow className={resultClassName}/>
        case IconType.FB_LOGO:
            return <FbLogo className={resultClassName}/>
        case IconType.X_LOGO:
            return <XLogo className={resultClassName}/>
        case IconType.TG_LOGO:
            return <TgLogo className={resultClassName}/>
        case IconType.LI_LOGO:
            return <LiLogo className={resultClassName}/>
        case IconType.VK_LOGO:
            return <VkLogo className={resultClassName}/>
        case IconType.REDDIT_LOGO:
            return <RedditLogo className={resultClassName}/>
        case IconType.CLIPBOARD:
            return <Clipboard className={resultClassName}/>
        default:
            return null;
    }
}
