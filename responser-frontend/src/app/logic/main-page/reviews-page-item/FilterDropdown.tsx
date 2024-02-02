import React from "react";
import {DropDownMenuButton} from "../../../components/dropdown-menu-button/DropDownMenuButton";
import {Button, ButtonSize, ButtonType} from "../../../components/button/Button";
import {RadioButtonGroup} from "../../../components/form/radio-button-group/RadioButtonGroup";
import {ResourceType} from "../../../model/ResourceType";
import Nouislider from "nouislider-react";
import {Icon, IconType} from "../../../components/icon/Icon";

type FilterDropdownProps = {
    currentResourceTypeValue: ResourceType;
    onResourceTypeChange: (resourceType: ResourceType) => void;
    loadReviews: () => Promise<void>;
    minRating: number;
    maxRating: number;
    onRatingRangeChange: (values: number[]) => void;
    onDropdownStateChange?: (isOpen: boolean) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = (props: FilterDropdownProps) => {
    const {
        currentResourceTypeValue,
        onResourceTypeChange,
        minRating,
        maxRating,
        onRatingRangeChange,
        onDropdownStateChange,
        loadReviews
    } = props;

    return (
        <DropDownMenuButton label={<>Filter<Icon type={IconType.SETTINGS_1}/></>} className="filter-dropdown" onStateChange={onDropdownStateChange}>
            {(closeMenu) => (
                <div className="menu">
                    <p className="menu-group-header">Rating</p>

                    <div className="field-group">
                        <RadioButtonGroup<ResourceType>
                            options={[
                                {label: "Site", value: ResourceType.SITE},
                                {label: "Page", value: ResourceType.PAGE},
                                {label: "All", value: null}
                            ]}
                            currentValue={currentResourceTypeValue}
                            onChange={onResourceTypeChange}/>
                    </div>

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
                        <Nouislider range={{min: 1, max: 5}}
                                    start={[minRating, maxRating]}
                                    step={1}
                                    pips={{mode: 'steps', density: -1}}
                                    onSlide={onRatingRangeChange}/>
                    </div>

                    <Button styleType={ButtonType.PRIMARY} size={ButtonSize.SMALL} onClick={() => {
                        closeMenu();
                        loadReviews();
                    }}>Apply</Button>
                </div>
            )}
        </DropDownMenuButton>
    );
}
