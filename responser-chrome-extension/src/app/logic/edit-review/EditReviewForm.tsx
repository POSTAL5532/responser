import React, {ChangeEvent} from "react";
import {observer} from "mobx-react";
import {Button} from "../../components/button/Button";
import {ReviewData} from "../../model/ReviewData";
import {Rating} from "../../components/rating/Rating";
import {Textarea} from "../../components/form/Textarea";
import {ResourceType} from "../../model/ResourceType";
import {ButtonRadioGroup} from "../../components/button-radio-group/ButtonRadioGroup";
import {ConditionShow} from "../../components/ConditionShow";

type EditReviewFormProps = {
    reviewData: ReviewData;
    onSubmit: () => void;
    onCancel: () => void;
    isNewReview?: boolean;
}

const EditReviewForm: React.FC<EditReviewFormProps> = (props: EditReviewFormProps) => {
    const {reviewData, onSubmit, onCancel, isNewReview} = props;
    const {rating, text, resourceType} = reviewData;

    const changeResourceType = (resourceType: ResourceType) => {
        reviewData.resourceType = resourceType;
    }
    const onRatingChange = (rating: number) => {
        reviewData.rating = rating;
    }

    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        reviewData.text = event.target.value;
    }

    return (
        <>
            <ConditionShow condition={isNewReview}>
                <ButtonRadioGroup<ResourceType> values={[
                    {value: ResourceType.SITE, label: "Site"},
                    {value: ResourceType.PAGE, label: "Page"}
                ]} currentValue={resourceType} onChange={changeResourceType}/>
            </ConditionShow>

            <div className="rating-container">
                <Rating value={rating} onChange={onRatingChange} disabled={!resourceType}/>
                <Button onClick={onCancel} outlined={true}>Cancel</Button>
            </div>

            <div className="text-container">
                <Textarea name="review" value={text} onChange={onTextChange} disabled={!resourceType}/>
            </div>

            <div className="leave-review-container">
                <Button onClick={onSubmit} disabled={!text || !resourceType}>
                    {isNewReview ? "Leave" : "Save"} review
                </Button>
            </div>
        </>
    )
}

export default observer(EditReviewForm)
