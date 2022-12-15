import React, {ChangeEvent} from "react";
import {observer} from "mobx-react";
import {Button} from "../../components/button/Button";
import {ReviewData} from "../../model/ReviewData";
import {Rating} from "../../components/rating/Rating";
import {Textarea} from "../../components/form/Textarea";

type EditReviewFormProps = {
    reviewData: ReviewData;
    onSubmit: () => void;
    onCancel: () => void;
    isEdit?: boolean;
}

const EditReviewForm: React.FC<EditReviewFormProps> = (props: EditReviewFormProps) => {
    const {reviewData, onSubmit, onCancel, isEdit} = props;

    const onRatingChange = (rating: number) => {
        reviewData.rating = rating;
    }

    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        reviewData.text = event.target.value;
    }

    return (
        <>
            <div className="rating-container">
                <Rating value={reviewData?.rating} onChange={onRatingChange}/>
                <Button onClick={onCancel} outlined={true}>Cancel</Button>
            </div>
            <div className="text-container">
                <Textarea name="review" value={reviewData?.text} onChange={onTextChange}/>
            </div>
            <div className="leave-review-container">
                <Button onClick={onSubmit} disabled={!reviewData?.text}>{isEdit ? "Save" : "Leave"} review</Button>
            </div>
        </>
    )
}

export default observer(EditReviewForm)
