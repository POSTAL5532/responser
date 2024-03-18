import React from "react";
import {ResourceType} from "../../../model/ResourceType";
import {FieldLayout} from "../../../components/form/field-layout/FieldLayout";
import {RadioButtonGroup} from "../../../components/form/radio-button-group/RadioButtonGroup";

type EditReviewResourceTypeProps = {
    onCurrentResourceTypeChange: (resourceType: ResourceType) => void;
    currentResourceType: ResourceType;
    userLeftSiteReview: boolean;
    userLeftPageReview: boolean;
    isDisplay: boolean;
}

export const EditReviewResourceType: React.FC<EditReviewResourceTypeProps> = (props: EditReviewResourceTypeProps) => {
    const {userLeftSiteReview, userLeftPageReview, currentResourceType, isDisplay, onCurrentResourceTypeChange} = props;

    if (!isDisplay) {
        return null;
    }

    return(
        <FieldLayout label="Select review type:">
            <RadioButtonGroup<ResourceType> className="resource-type-choice" options={[
                {
                    value: ResourceType.SITE,
                    label: <><p className="choice-label">Site review {userLeftSiteReview && "(exist)"}</p><p className="choice-description">Express your opinion about the entire site</p></>,
                    disabled: userLeftSiteReview
                },
                {
                    value: ResourceType.PAGE,
                    label: <><p className="choice-label">Page review {userLeftPageReview && "(exist)"}</p><p className="choice-description">Express your opinion about the current page</p></>,
                    disabled: userLeftPageReview
                }
            ]} currentValue={currentResourceType} onChange={onCurrentResourceTypeChange}/>
        </FieldLayout>
    );
}