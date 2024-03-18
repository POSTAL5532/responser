import React from "react";
import {Button, ButtonType} from "../../../components/button/Button";
import {Icon, IconType} from "../../../components/icon/Icon";
import {AppFooter} from "../../../components/app-footer/AppFooter";
import {ConditionShow} from "../../../components/ConditionShow";
import "./EditReviewFooter.less";

type EditReviewFooterProps = {
    onSubmit: () => void;
    onCancel: () => void;
    onNext: () => void;

    submitButtonLabel: string;
    showSubmitButton: boolean;
    showNextButton: boolean;
    nextButtonDisabled: boolean;
    submitDisabled: boolean;
    isDataSubmitting: boolean;
}

export const EditReviewFooter: React.FC<EditReviewFooterProps> = (props: EditReviewFooterProps) => {
    const {
        submitDisabled,
        isDataSubmitting,
        showSubmitButton,
        showNextButton,
        nextButtonDisabled,
        submitButtonLabel,
        onSubmit,
        onNext,
        onCancel
    } = props;

    return (
        <AppFooter className="edit-review-footer">
            <ConditionShow condition={showSubmitButton}>
                <Button className="submit"
                        onClick={onSubmit}
                        disabled={isDataSubmitting || submitDisabled}
                        loading={isDataSubmitting}
                        styleType={ButtonType.PRIMARY}>
                    <Icon type={IconType.PLUS}/>{submitButtonLabel}
                </Button>
            </ConditionShow>

            <ConditionShow condition={showNextButton}>
                <Button className="next" onClick={onNext} disabled={nextButtonDisabled} styleType={ButtonType.PRIMARY}>
                    <Icon type={IconType.ARROW}/>Next
                </Button>
            </ConditionShow>

            <Button className="cancel" onClick={onCancel} disabled={isDataSubmitting}>
                <Icon type={IconType.CANCEL}/>Cancel
            </Button>
        </AppFooter>
    );
}
