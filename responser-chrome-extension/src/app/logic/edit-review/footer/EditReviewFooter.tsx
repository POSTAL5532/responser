import React from "react";
import {Button, ButtonType} from "../../../components/button/Button";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./EditReviewFooter.less";

type EditReviewFooterProps = {
    onSubmit: () => void;
    onCancel: () => void;
    isNewReview: boolean;
    submitDisabled: boolean;
}

export const EditReviewFooter: React.FC<EditReviewFooterProps> = (props: EditReviewFooterProps) => {
    const {onSubmit, isNewReview, submitDisabled, onCancel} = props;

    return (
        <div className="footer">
            <Button onClick={onSubmit} disabled={submitDisabled}>
                <Icon type={isNewReview ? IconType.PLUS : IconType.CHECK}/>
                {isNewReview ? "Add" : "Save"} review
            </Button>
            <Button onClick={onCancel} styleType={ButtonType.SECONDARY}>
                <Icon type={IconType.CANCEL}/>
                Cancel
            </Button>
        </div>
    );
}
