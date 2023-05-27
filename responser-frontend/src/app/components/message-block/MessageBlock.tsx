import React, {PropsWithChildren} from "react";
import classNames from "classnames";
import "./MessageBlock.less";

export enum MessageBlockType {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    ERROR = "ERROR"
}

type MessageBlockProps = {
    className?: string;
    type?: MessageBlockType;
} & PropsWithChildren;

export const MessageBlock: React.FC<MessageBlockProps> = (props: MessageBlockProps) => {
    const {children, className, type = MessageBlockType.INFO} = props;
    const resultClassName = classNames("message-block", type.toLowerCase(), className);

    return (
        <div className={resultClassName}>
            {children}
        </div>
    );
}