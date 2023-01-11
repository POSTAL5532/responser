import React, {ReactElement} from "react";
import classNames from "classnames";
import "./Tabs.less";

export type TabOption<T> = {
    value: T,
    label: string;
    disabled?: boolean;
}

type TabsProps<T> = {
    options: TabOption<T>[];
    currentValue?: T;
    onChange?: (value: T) => void;
    className?: string;
}
export const Tabs = <T extends any>(props: TabsProps<T>): ReactElement => {
    const {options, currentValue, onChange, className} = props;

    const onButtonClick = (value: T) => {
        onChange(value);
    }

    const getOptionsTabs = () => {
        return options.map((option, index) => (
            <Tab label={option.label}
                 onClick={() => onButtonClick(option.value)}
                 active={option.value === currentValue}/>
        ))
    }

    const resultClassName = classNames("tabs", className);

    return (<div className={resultClassName}>{getOptionsTabs()}</div>);
}

type TabProps = {
    label: string;
    onClick: () => void;
    active: boolean;
    clickDuplication?: boolean;
}

const Tab: React.FC<TabProps> = (props: TabProps) => {
    const {label, onClick, active, clickDuplication} = props;
    const className = classNames("tab", {"active": active});

    const onTabClick = () => {
        if (clickDuplication || !active) onClick();
    }

    return (<div className={className} onClick={onTabClick}>{label}</div>);
}
