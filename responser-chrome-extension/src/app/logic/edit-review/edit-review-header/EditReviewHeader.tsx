import React from "react";
import {AppHeader} from "../../../components/app-header/AppHeader";
import {ResourceType} from "../../../model/ResourceType";
import "./EditReviewHeader.less";

type ResourceTypeChoiceHeaderProps = {
    isNewReview: boolean;
    resourceType: ResourceType;
}

export const ResourceTypeChoiceHeader: React.FC<ResourceTypeChoiceHeaderProps> = (props: ResourceTypeChoiceHeaderProps) => {
    const {isNewReview, resourceType} = props;

    const getHeaderText = () => {
        let text: string = isNewReview ? "Create" : "Edit";

        if (resourceType === ResourceType.SITE) {
            text = text + " site";
        } else if (resourceType === ResourceType.PAGE) {
            text = text + " page";
        }

        text = text + " review";

        return text;
    }

    return(
        <AppHeader className="edit-review-header" headerLabel="Reviewly">
            {getHeaderText()}
        </AppHeader>
    );
}
