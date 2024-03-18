import {SortingWrapper} from "../ReviewsPageStore";
import React from "react";
import {ReviewsCriteriaSortingField} from "../../../model/ReviewsCriteriaSortingField";
import {SortDirection} from "../../../model/SortDirection";
import {RadioButtonGroup} from "../../../components/form/radio-button-group/RadioButtonGroup";

type SortingSubmenuProps = {
    currentSortingValue: SortingWrapper;
    setCriteriaSorting: (sorting: SortingWrapper) => void;
}

export const SortingSubmenu: React.FC<SortingSubmenuProps> = (props: SortingSubmenuProps) => {
    const {currentSortingValue, setCriteriaSorting} = props;

    return (
        <div className="sorting-submenu">
            <SortingMenuItem
                groupLabel="Rating"
                firstLabel="High rating first"
                firstValue={new SortingWrapper(ReviewsCriteriaSortingField.RATING, SortDirection.DESC)}
                secondLabel="Low rating first"
                secondValue={new SortingWrapper(ReviewsCriteriaSortingField.RATING, SortDirection.ASC)}
                currentValue={currentSortingValue}
                onChange={setCriteriaSorting}/>

            <SortingMenuItem
                groupLabel="Date"
                firstLabel="New ones first"
                firstValue={new SortingWrapper(ReviewsCriteriaSortingField.CREATION_DATE, SortDirection.DESC)}
                secondLabel="Old ones first"
                secondValue={new SortingWrapper(ReviewsCriteriaSortingField.CREATION_DATE, SortDirection.ASC)}
                currentValue={currentSortingValue}
                onChange={setCriteriaSorting}/>

            <SortingMenuItem
                groupLabel="Popularity"
                firstLabel="Popular first"
                firstValue={new SortingWrapper(ReviewsCriteriaSortingField.POPULARITY, SortDirection.DESC)}
                secondLabel="Unpopular at first"
                secondValue={new SortingWrapper(ReviewsCriteriaSortingField.POPULARITY, SortDirection.ASC)}
                currentValue={currentSortingValue}
                onChange={setCriteriaSorting}/>
        </div>
    );
}

type SortingMenuItemProps = {
    groupLabel: string;
    firstLabel: string;
    firstValue: SortingWrapper;
    secondLabel: string;
    secondValue: SortingWrapper;
    currentValue: SortingWrapper;
    onChange: (value: SortingWrapper) => void;
    disabled?: boolean;
}
const SortingMenuItem: React.FC<SortingMenuItemProps> = (props: SortingMenuItemProps) => {
    const {
        groupLabel,
        currentValue,
        onChange,
        firstLabel,
        firstValue,
        secondLabel,
        secondValue,
        disabled = false
    } = props;

    return (
        <div className="sorting-menu-group">
            <p className="menu-group-header">{groupLabel}</p>
            <RadioButtonGroup<SortingWrapper>
                disabled={disabled}
                options={[{label: firstLabel, value: firstValue}, {label: secondLabel, value: secondValue}]}
                currentValue={currentValue}
                onChange={onChange}/>
        </div>
    );
}