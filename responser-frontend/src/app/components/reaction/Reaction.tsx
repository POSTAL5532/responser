import React from "react";
import {ReactComponent as ReactionIcon} from './reaction.svg';
import {ReactComponent as ReactionNegativeIcon} from './reaction-negative.svg';
import classNames from "classnames";
import "./Reaction.less"

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
        "current-user-reacted": currentUserReacted,
        "disabled": disabled
    }, className);

    const onReactionClick = () => {
        if (!disabled) onClick(positive)
    }

    return (
        <div className={resultClassName} onClick={onReactionClick}>
            <span className="reaction-icon">
                {positive ? <ReactionIcon/> : <ReactionNegativeIcon/>}
            </span>
            <span className="count">{count}</span>
        </div>
    );
}
