import React, {ChangeEvent} from "react";
import classNames from "classnames";
import "./Toggler.less";

type TogglerProps = {
    checked: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
    label?: string;
}

export const Toggler: React.FC<TogglerProps> = (props: TogglerProps) => {
    const {checked, onChange, className, label} = props;

    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.checked);
    }

    return (
        <div className={classNames("toggler", className)}>
            <span className="label">{label}</span>
            <label className="switch">
                <input type="checkbox" checked={checked} onChange={handleToggle}/>
                <span className="slider"></span>
            </label>
        </div>
    );
}