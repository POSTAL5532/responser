import React from "react";
import {Button, ButtonType} from "../../../components/button/Button";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./EditReviewFooter.less";
import {Spinner} from "../../../components/spinner/Spinner";

type EditReviewFooterProps = {
    onSubmit: () => void;
    onCancel: () => void;
    isNewReview: boolean;
    submitDisabled: boolean;
    isDataSubmitting: boolean;
}

export const EditReviewFooter: React.FC<EditReviewFooterProps> = (props: EditReviewFooterProps) => {
    const {onSubmit, isNewReview, submitDisabled, isDataSubmitting, onCancel} = props;

    console.log("isDataSubmitting", isDataSubmitting);

    return (
        <div className="footer">
            <Button onClick={onSubmit} disabled={isDataSubmitting || submitDisabled}>
                {
                    isDataSubmitting
                        ? <Spinner size={14} color="#555770"/>
                        : <Icon type={isNewReview ? IconType.PLUS : IconType.CHECK}/>
                }
                {isNewReview ? "Add" : "Save"} review
            </Button>
            <Button onClick={onCancel} styleType={ButtonType.SECONDARY} disabled={isDataSubmitting}>
                <Icon type={IconType.CANCEL}/>Cancel
            </Button>
        </div>
    );
}
