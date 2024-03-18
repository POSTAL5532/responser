import React from "react";
import {observer} from "mobx-react";
import {ReviewData} from "../../../model/ReviewData";
import {ResourceType} from "../../../model/ResourceType";
import {Spinner} from "../../../components/spinner/Spinner";
import {EditReviewResourceType} from "./EditReviewResourceType";
import {EditReviewData} from "./EditReviewData";
import "./EditReviewForm.less";

type EditReviewFormProps = {
    reviewData: ReviewData;
    onCurrentResourceTypeChange: (resourceType: ResourceType) => void;
    currentResourceType: ResourceType;
    userLeftPageReview: boolean;
    userLeftSiteReview: boolean;
    isLoading: boolean;
    isDataSubmitting: boolean;
    showSecondEditingStep: boolean;
    isNewReview?: boolean;
}

const EditReviewForm: React.FC<EditReviewFormProps> = (props: EditReviewFormProps) => {
    const {
        reviewData,
        userLeftPageReview,
        userLeftSiteReview,
        isNewReview,
        isLoading,
        isDataSubmitting,
        onCurrentResourceTypeChange,
        currentResourceType,
        showSecondEditingStep
    } = props;

    const className = "edit-review-form";

    if (isLoading) {
        return <div className={className}><Spinner/></div>;
    }

    const onRatingChange = (rating: number) => {
        reviewData.rating = rating;
    }

    return (
        <div className={className}>
            <EditReviewResourceType currentResourceType={currentResourceType}
                                    onCurrentResourceTypeChange={onCurrentResourceTypeChange}
                                    userLeftSiteReview={userLeftSiteReview}
                                    userLeftPageReview={userLeftPageReview}
                                    isDisplay={isNewReview && !showSecondEditingStep}/>

            <EditReviewData rating={reviewData.rating}
                            onRatingChange={onRatingChange}
                            text={reviewData.text}
                            onTextChange={value => reviewData.text = value}
                            currentResourceType={currentResourceType}
                            disabled={isDataSubmitting || !currentResourceType}
                            isDisplay={!isNewReview || showSecondEditingStep}/>
        </div>
    )
}

export default observer(EditReviewForm);
