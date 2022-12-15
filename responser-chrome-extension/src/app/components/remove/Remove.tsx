import React from "react";
import {ReactComponent as RemoveIcon} from './remove.svg';
import "./Remove.less";

type RemoveProps = {
    onClick?: () => void;
}

export const Remove: React.FC<RemoveProps> = (props: RemoveProps) => {
    return (
        <div className="remove" onClick={props.onClick}>
            <RemoveIcon/>
        </div>
    );
}
