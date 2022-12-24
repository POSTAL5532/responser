import React from "react";
import classNames from "classnames";
import {default as ReactRating} from "react-rating";
import {ReactComponent as Star} from './star.svg';
import {ReactComponent as FilledStar} from './star-fill.svg';
import "./Rating.less";

type RatingProps = {
    value: number;
    className?: string;
    readonly?: boolean;
    onChange?: (value: number) => void;
    disabled?: boolean;
}

export const Rating: React.FC<RatingProps> = (props: RatingProps) => {
    const {value, readonly, onChange, className, disabled} = props;
    const resultClassName = classNames("rating", {"readonly": readonly, "disabled": disabled,}, className);

    const onRatingChange = (value: number) => {
        if(!disabled) onChange(value);
    }

    return (
        //@ts-ignore: react-rating types issue
        <ReactRating className={resultClassName}
                     initialRating={value}
                     onChange={onRatingChange}
                     readonly={readonly || disabled}
                     emptySymbol={<Star className="star"/>}
                     fullSymbol={<FilledStar className="star"/>}/>
    );
}