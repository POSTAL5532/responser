import React from "react";
import classNames from "classnames";
import {Icon, IconType} from "../icon/Icon";
import "./Reaction.less";

type ReactionProps = {
    count: number;
    positive: boolean;
    currentUserReacted: boolean;
    disabled?: boolean;
    onClick?: (positive: boolean) => void;
    className?: string;
}

export const Reaction: React.FC<ReactionProps> = (props: ReactionProps) => {
    const {count, positive, currentUserReacted, disabled, onClick, className} = props;
    const resultClassName = classNames("reaction", {
        "positive": positive,
        "negative": !positive,
        "current-user-reacted": currentUserReacted,
        "disabled": disabled
    }, className);

    const onReactionClick = () => {
        if (!disabled) onClick(positive);
    }

    return (
        <div className={resultClassName} onClick={onReactionClick}>
            <Icon type={IconType.CIRCLE_ARROW} className="reaction-icon"/>
            <span className="count">{count}</span>
        </div>
    );
}
