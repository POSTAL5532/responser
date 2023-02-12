import React, {ChangeEvent} from "react";
import {observer} from "mobx-react";
import Skeleton from "react-loading-skeleton";
import {ReviewData} from "../../../model/ReviewData";
import {Rating} from "../../../components/rating/Rating";
import {Textarea} from "../../../components/form/textarea/Textarea";
import {ResourceType} from "../../../model/ResourceType";
import {RadioButtonGroup} from "../../../components/form/radio-button-group/RadioButtonGroup";
import {ConditionShow} from "../../../components/ConditionShow";
import {FieldLayout, FieldLayoutType} from "../../../components/form/field-layout/FieldLayout";
import "./EditReviewForm.less";

type EditReviewFormProps = {
    reviewData: ReviewData;
    userLeftPageReview: boolean;
    userLeftSiteReview: boolean;
    isLoading: boolean;
    isDataSubmitting: boolean;
    isNewReview?: boolean;
}

const EditReviewForm: React.FC<EditReviewFormProps> = (props: EditReviewFormProps) => {
    const {
        reviewData,
        userLeftPageReview,
        userLeftSiteReview,
        isNewReview,
        isLoading,
        isDataSubmitting
    } = props;

    if (isLoading) {
        return (<Skeleton className="edit-form-skeleton"/>);
    }

    const {rating, text, resourceType} = reviewData;
    const textSize = 460;

    const changeResourceType = (resourceType: ResourceType) => {
        reviewData.resourceType = resourceType;
    }
    const onRatingChange = (rating: number) => {
        reviewData.rating = rating;
    }

    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length > textSize) return;
        reviewData.text = event.target.value;
    }

    return (
        <div className="edit-review-form">
            <ConditionShow condition={isNewReview}>
                <FieldLayout label="Review type:" disabled={isDataSubmitting}>
                    <RadioButtonGroup<ResourceType> options={[
                        {
                            value: ResourceType.SITE,
                            label: "Site review",
                            disabled: isDataSubmitting || userLeftSiteReview
                        },
                        {
                            value: ResourceType.PAGE,
                            label: "Page review",
                            disabled: isDataSubmitting || userLeftPageReview
                        }
                    ]} currentValue={resourceType} onChange={changeResourceType}/>
                </FieldLayout>
            </ConditionShow>

            <FieldLayout label="Rating:" layoutType={FieldLayoutType.INLINE}
                         disabled={isDataSubmitting || !resourceType}>
                <Rating value={rating} onChange={onRatingChange}
                        disabled={isDataSubmitting || !resourceType}/>
            </FieldLayout>

            <FieldLayout label="Review text:" disabled={isDataSubmitting || !resourceType}
                         className="review-text">
                <Textarea value={text}
                          onChange={onTextChange}
                          disabled={isDataSubmitting || !resourceType}
                          placeholder={`Enter review`}/>
            </FieldLayout>

            <span className="characters-counter">{text?.length || 0} / {textSize}</span>
        </div>
    )
}

export default observer(EditReviewForm)
