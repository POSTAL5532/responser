import React from "react";
import Nouislider from "nouislider-react";
import {Icon, IconType} from "../../../components/icon/Icon";

type FilterSubmenuProps = {
    minRating: number;
    maxRating: number;
    onRatingRangeChange: (values: number[]) => void;
}

export const FilterSubmenu: React.FC<FilterSubmenuProps> = (props: FilterSubmenuProps) => {
    const {minRating, maxRating, onRatingRangeChange} = props;

    return (
        <div className="filter-submenu">
            <p className="menu-group-header">Rating</p>

            <div className="range-container">
                <div className="rating-range-labels-container">
                    <div className="rating-label min-value-label">
                        <span className="prefix">from</span>
                        <Icon type={IconType.STAR}/>
                        <span className="value">{minRating}</span>
                    </div>
                    <div className="rating-label max-value-label">
                        <span className="prefix">to</span>
                        <Icon type={IconType.STAR}/>
                        <span className="value">{maxRating}</span>
                    </div>
                </div>

                <div className="slider-container">
                    <Nouislider
                        range={{min: 1, max: 5}}
                        start={[minRating, maxRating]}
                        step={1}
                        pips={{mode: 'steps', density: -1}}
                        onSlide={onRatingRangeChange}/>
                </div>
            </div>
        </div>
    );
}
