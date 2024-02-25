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
    disabled?: boolean;
}
export const Tabs = <T extends any>(props: TabsProps<T>): ReactElement => {
    const {options, currentValue, onChange, className, disabled} = props;

    const onButtonClick = (value: T) => {
        onChange(value);
    }

    const getOptionsTabs = () => {
        return options.map((option, index) => (
            <Tab key={index}
                 label={option.label}
                 onClick={() => onButtonClick(option.value)}
                 active={option.value === currentValue}
                 disabled={option.disabled || disabled}/>
        ))
    }

    return <div className={classNames("tabs", {"disabled": disabled}, className)}>{getOptionsTabs()}</div>;
}

type TabProps = {
    label: string;
    onClick: () => void;
    active: boolean;
    clickDuplication?: boolean;
    disabled?: boolean;
}

const Tab: React.FC<TabProps> = (props: TabProps) => {
    const {label, onClick, active, clickDuplication, disabled} = props;
    const className = classNames("tab", {"active": active}, {"disabled": disabled});

    const onTabClick = () => {
        if (clickDuplication || !active) onClick();
    }

    return (<div className={className} onClick={onTabClick}>{label}</div>);
}
