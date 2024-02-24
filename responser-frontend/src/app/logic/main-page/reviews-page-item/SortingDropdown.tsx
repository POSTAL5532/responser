import {SortingWrapper} from "./MyReviewsPageItemStore";
import React from "react";
import {DropDownMenuButton} from "../../../components/dropdown-menu-button/DropDownMenuButton";
import {ReviewsCriteriaSortingField} from "../../../model/ReviewsCriteriaSortingField";
import {SortDirection} from "../../../model/SortDirection";
import {Button, ButtonSize, ButtonType} from "../../../components/button/Button";
import {RadioButtonGroup} from "../../../components/form/radio-button-group/RadioButtonGroup";

type SortingDropdownProps = {
    currentSortingValue: SortingWrapper;
    setCriteriaSorting: (sorting: SortingWrapper) => void;
    loadReviews: () => Promise<void>;
    onDropdownStateChange?: (isOpen: boolean) => void;
    disabled?: boolean;
}

export const SortingDropdown: React.FC<SortingDropdownProps> = (props: SortingDropdownProps) => {
    const {currentSortingValue, setCriteriaSorting, onDropdownStateChange, loadReviews, disabled = false} = props;

    return (
        <DropDownMenuButton label="Sorting" className="sorting-dropdown" onStateChange={onDropdownStateChange} disabled={disabled}>
            {(closeMenu) => (
                <div className="menu">
                    <SortingMenuItem
                        groupLabel="Rating"
                        disabled={disabled}
                        firstLabel="High rating first"
                        firstValue={new SortingWrapper(ReviewsCriteriaSortingField.RATING, SortDirection.DESC)}
                        secondLabel="Low rating first"
                        secondValue={new SortingWrapper(ReviewsCriteriaSortingField.RATING, SortDirection.ASC)}
                        currentValue={currentSortingValue}
                        onChange={setCriteriaSorting}/>

                    <SortingMenuItem
                        groupLabel="Date"
                        disabled={disabled}
                        firstLabel="New ones first"
                        firstValue={new SortingWrapper(ReviewsCriteriaSortingField.CREATION_DATE, SortDirection.DESC)}
                        secondLabel="Old ones first"
                        secondValue={new SortingWrapper(ReviewsCriteriaSortingField.CREATION_DATE, SortDirection.ASC)}
                        currentValue={currentSortingValue}
                        onChange={setCriteriaSorting}/>

                    <SortingMenuItem
                        groupLabel="Popularity"
                        disabled={disabled}
                        firstLabel="Popular first"
                        firstValue={new SortingWrapper(ReviewsCriteriaSortingField.POPULARITY, SortDirection.DESC)}
                        secondLabel="Unpopular at first"
                        secondValue={new SortingWrapper(ReviewsCriteriaSortingField.POPULARITY, SortDirection.ASC)}
                        currentValue={currentSortingValue}
                        onChange={setCriteriaSorting}/>

                    <Button disabled={disabled} styleType={ButtonType.PRIMARY} size={ButtonSize.SMALL} onClick={() => {
                        closeMenu();
                        loadReviews();
                    }}>Apply</Button>
                </div>
            )}
        </DropDownMenuButton>
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
        <>
            <p className="menu-group-header">{groupLabel}</p>
            <div className="field-group">
                <RadioButtonGroup<SortingWrapper>
                    disabled={disabled}
                    options={[{label: firstLabel, value: firstValue}, {label: secondLabel, value: secondValue}]}
                    currentValue={currentValue}
                    onChange={onChange}/>
            </div>
        </>
    );
}