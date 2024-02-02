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
}

export const SortingDropdown: React.FC<SortingDropdownProps> = (props: SortingDropdownProps) => {
    const {currentSortingValue, setCriteriaSorting, onDropdownStateChange, loadReviews} = props;

    return(
        <DropDownMenuButton label="Sorting" className="sorting-dropdown" onStateChange={onDropdownStateChange}>
            {(closeMenu) => (
                <div className="menu">
                    <SortingMenuItem
                        firstLabel="High rating first"
                        firstValue={new SortingWrapper(ReviewsCriteriaSortingField.RATING, SortDirection.ASC)}
                        secondLabel="Low rating first"
                        secondValue={new SortingWrapper(ReviewsCriteriaSortingField.RATING, SortDirection.DESC)}
                        currentValue={currentSortingValue}
                        onChange={setCriteriaSorting}/>

                    <SortingMenuItem
                        firstLabel="New ones first"
                        firstValue={new SortingWrapper(ReviewsCriteriaSortingField.CREATION_DATE, SortDirection.DESC)}
                        secondLabel="Old ones first"
                        secondValue={new SortingWrapper(ReviewsCriteriaSortingField.CREATION_DATE, SortDirection.ASC)}
                        currentValue={currentSortingValue}
                        onChange={setCriteriaSorting}/>

                    <SortingMenuItem
                        firstLabel="Popular first"
                        firstValue={new SortingWrapper(ReviewsCriteriaSortingField.POPULARITY, SortDirection.DESC)}
                        secondLabel="Unpopular at first"
                        secondValue={new SortingWrapper(ReviewsCriteriaSortingField.POPULARITY, SortDirection.ASC)}
                        currentValue={currentSortingValue}
                        onChange={setCriteriaSorting}/>

                    <Button styleType={ButtonType.PRIMARY} size={ButtonSize.SMALL} onClick={() => {
                        closeMenu();
                        loadReviews();
                    }}>Apply</Button>
                </div>
            )}
        </DropDownMenuButton>
    );
}


type SortingMenuItemProps = {
    firstLabel: string;
    firstValue: SortingWrapper;
    secondLabel: string;
    secondValue: SortingWrapper;
    currentValue: SortingWrapper;
    onChange: (value: SortingWrapper) => void;
}
const SortingMenuItem: React.FC<SortingMenuItemProps> = (props: SortingMenuItemProps) => {
    const {currentValue, onChange, firstLabel, firstValue, secondLabel, secondValue} = props;

    return (
        <>
            <p className="menu-group-header">Rating</p>
            <div className="field-group">
                <RadioButtonGroup<SortingWrapper>
                    options={[{label: firstLabel, value: firstValue}, {label: secondLabel, value: secondValue}]}
                    currentValue={currentValue}
                    onChange={onChange}/>
            </div>
        </>
    );
}