import React from "react";
import {ReactComponent as SiteIcon} from './site-icon.svg';
import {ReactComponent as PageIcon} from './page-icon.svg';
import {ResourceType} from "../../../model/ResourceType";
import {Domain} from "../../../model/Domain";
import {Page} from "../../../model/Page";
import {TabOption, Tabs} from "../../../components/tabs/Tabs";
import "./ReviewsHeader.less";

type ReviewsHeaderProps = {
    reviewsResourceType: ResourceType;
    onResourceTypeChange: (resourceType: ResourceType) => void;
    resource: Domain | Page;
    isLoading: boolean;
}

export const ReviewsHeader: React.FC<ReviewsHeaderProps> = (props: ReviewsHeaderProps) => {
    const {reviewsResourceType, resource, isLoading, onResourceTypeChange} = props;

    let resourceIcon: JSX.Element, resourceLabel: string, resourceRating: number;
    if (!isLoading && reviewsResourceType === ResourceType.SITE) {
        resourceIcon = <SiteIcon className="icon"/>;
        resourceLabel = (resource as Domain).domain;
        resourceRating = resource.rating;
    } else if (!isLoading && reviewsResourceType === ResourceType.PAGE) {
        resourceIcon = <PageIcon className="icon"/>;
        resourceLabel = resource.name;
        resourceRating = resource.rating;
    }

    const resourceTypeOptions: TabOption<ResourceType>[] = [
        {value: ResourceType.SITE, label: "Site reviews"},
        {value: ResourceType.PAGE, label: "Page reviews"}
    ]

    return (
        <div className="reviews-header">
            <ResourceInfo resourceIcon={resourceIcon}
                          resourceLabel={resourceLabel}
                          resourceRating={resourceRating}
                          isLoading={isLoading}/>
            <Tabs<ResourceType> onChange={onResourceTypeChange}
                                options={resourceTypeOptions}
                                currentValue={reviewsResourceType}/>
        </div>
    )
}

type ResourceInfoProps = {
    resourceIcon: JSX.Element;
    resourceLabel: string;
    resourceRating: number;
    isLoading?: boolean;
}

const ResourceInfo: React.FC<ResourceInfoProps> = (props: ResourceInfoProps) => {
    const {resourceIcon, resourceLabel, resourceRating, isLoading} = props;

    if (isLoading) {
        return <>LOADING</>
    }

    return (
        <div className="resource-info">
            {resourceIcon}
            <div className="label">{resourceLabel}</div>
            {
                !!resourceRating &&
                <div className="rating">
                    <span>{resourceRating.toPrecision(2)} / 5</span>
                </div>
            }
        </div>
    );
}
