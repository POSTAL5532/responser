import React from "react";
import {ResourceType} from "../../../model/ResourceType";
import {TabOption, Tabs} from "../../../components/tabs/Tabs";
import {Spinner} from "../../../components/spinner/Spinner";
import {WebResource} from "../../../model/WebResource";
import {AppHeader} from "../../../components/app-header/AppHeader";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./ReviewsHeader.less";

type ReviewsHeaderProps = {
    reviewsResourceType: ResourceType;
    onResourceTypeChange: (resourceType: ResourceType) => void;
    resource: WebResource;
    isLoading: boolean;
    isReviewsLoading: boolean;
}

export const ReviewsHeader: React.FC<ReviewsHeaderProps> = (props: ReviewsHeaderProps) => {
    const {
        reviewsResourceType,
        resource,
        isLoading,
        isReviewsLoading,
        onResourceTypeChange
    } = props;

    const resourceTypeOptions: TabOption<ResourceType>[] = [
        {value: ResourceType.SITE, label: "Site reviews"},
        {value: ResourceType.PAGE, label: "Page reviews"}
    ];

    const getHeaderLabel = () => {
        if (isLoading) {
            return <Spinner/>;
        }

        if (!resource.rating) {
            return null;
        }

        return (
            <>
                <p className="resource-type">
                    {resource.resourceType === ResourceType.SITE && "Site rating"}
                    {resource.resourceType === ResourceType.PAGE && "Page rating"}
                </p>
                <div className="resource-rating">
                    <Icon type={IconType.STAR}/>
                    <p className="rating-value">{resource.rating.toPrecision(2)}</p>
                </div>
            </>
        );
    }

    return (
        <AppHeader headerLabel={getHeaderLabel()} className="reviews-header">
            <Tabs<ResourceType>
                onChange={onResourceTypeChange}
                options={resourceTypeOptions}
                currentValue={reviewsResourceType}
                disabled={isReviewsLoading || isLoading}/>
        </AppHeader>
    )
}
