import React from "react";
import {default as ReactRating} from "react-rating";
import {ReactComponent as Star} from './star.svg';
import {ReactComponent as FilledStar} from './star-fill.svg';
import "./Rating.less";

type RatingProps = {
    value: number;
    readonly?: boolean;
    onChange?: (value: number) => void;
}

export const Rating: React.FC<RatingProps> = (props: RatingProps) => {
    const {value, readonly, onChange} = props;

    return (
        //@ts-ignore: react-rating types issue
        <ReactRating className="rating"
                     initialRating={value}
                     onChange={onChange}
                     readonly={readonly}
                     emptySymbol={<Star className="star"/>}
                     fullSymbol={<FilledStar className="star"/>}/>
    );
}