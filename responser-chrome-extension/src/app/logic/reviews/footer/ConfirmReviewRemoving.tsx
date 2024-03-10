import React from "react";
import {ResourceType} from "../../../model/ResourceType";

type ConfirmReviewRemovingProps = {
    currentResourceType: ResourceType;
}

export const ConfirmReviewRemoving: React.FC<ConfirmReviewRemovingProps> = (props: ConfirmReviewRemovingProps) => {
    const {currentResourceType} = props;

    return(
        <div className="confirm-review-removing-submenu">
            Do you really want to remove your review about this {currentResourceType.toLowerCase()}?
        </div>
    );
}
