import React from "react";
import {DropDownMenuButton} from "../../../components/dropdown-menu-button/DropDownMenuButton";
import {Button, ButtonType} from "../../../components/button/Button";
import {RadioButtonGroup} from "../../../components/form/radio-button-group/RadioButtonGroup";
import {ResourceType} from "../../../model/ResourceType";
import Nouislider from "nouislider-react";

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
        <DropDownMenuButton label="Filter" className="filter-dropdown" onStateChange={onDropdownStateChange}>
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

                    <span>min: {minRating}; max: {maxRating}</span>

                    <Nouislider range={{min: 1, max: 5}}
                                start={[minRating, maxRating]}
                                step={1}
                                pips={{mode: 'steps', density: -1}}
                                onSlide={onRatingRangeChange}/>

                    <Button styleType={ButtonType.PRIMARY} onClick={() => {
                        closeMenu();
                        loadReviews();
                    }}>Apply</Button>
                </div>
            )}
        </DropDownMenuButton>
    );
}
