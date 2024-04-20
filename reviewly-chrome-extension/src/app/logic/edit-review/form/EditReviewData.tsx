import React, {ChangeEvent} from "react";
import {FieldLayout} from "../../../components/form/field-layout/FieldLayout";
import {Rating} from "../../../components/rating/Rating";
import {TextArea, TextAreaStyleType} from "../../../components/form/textarea/TextArea";
import {ResourceType} from "../../../model/ResourceType";

const REVIEW_TEXT_MAX_LENGTH = 460;

type EditReviewDataProps = {
    rating: number;
    onRatingChange: (rating: number) => void;
    text: string;
    onTextChange: (text: string) => void;
    currentResourceType: ResourceType;
    disabled: boolean;
    isDisplay: boolean;
}

export const EditReviewData: React.FC<EditReviewDataProps> = (props: EditReviewDataProps) => {
    const {rating, text, currentResourceType, disabled, isDisplay, onTextChange, onRatingChange} = props;

    if (!isDisplay) {
        return null;
    }

    const onTextChangeListener = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let resultValue = event.target.value;

        if (resultValue.length > REVIEW_TEXT_MAX_LENGTH) {
            resultValue = resultValue.substring(0, REVIEW_TEXT_MAX_LENGTH);
        }

        onTextChange(resultValue);
    }

    return (
        <div className="edit-review-controls">
            <FieldLayout label="Rating:">
                <Rating className="edit-rating" value={rating} onChange={onRatingChange} disabled={disabled}/>
            </FieldLayout>

            <FieldLayout label="Review text:" disabled={disabled} className="review-text">
                <TextArea className="edit-review-text"
                          value={text}
                          onChange={onTextChangeListener}
                          styleType={TextAreaStyleType.SECONDARY}
                          disabled={disabled}
                          placeholder={`Write your opinion about the ${currentResourceType?.toLowerCase()}...`}/>
            </FieldLayout>

            <span className="characters-counter">{text?.length || 0} / {REVIEW_TEXT_MAX_LENGTH}</span>
        </div>
    );
}
