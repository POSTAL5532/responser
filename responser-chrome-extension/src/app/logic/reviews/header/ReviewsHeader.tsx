import React from "react";
import {ReactComponent as SiteIcon} from './site-icon.svg';
import {ReactComponent as PageIcon} from './page-icon.svg';
import {ResourceType} from "../../../model/ResourceType";
import {Domain} from "../../../model/Domain";
import {Page} from "../../../model/Page";
import {TabOption, Tabs} from "../../../components/tabs/Tabs";
import {PageInfo} from "../../../model/PageInfo";
import {Spinner} from "../../../components/spinner/Spinner";
import "./ReviewsHeader.less";

type ReviewsHeaderProps = {
    reviewsResourceType: ResourceType;
    onResourceTypeChange: (resourceType: ResourceType) => void;
    resource: Domain | Page;
    isLoading: boolean;
    isReviewsLoading: boolean;
    pageInfo: PageInfo;
}

export const ReviewsHeader: React.FC<ReviewsHeaderProps> = (props: ReviewsHeaderProps) => {
    const {
        reviewsResourceType,
        resource,
        isLoading,
        isReviewsLoading,
        onResourceTypeChange,
        pageInfo
    } = props;

    let resourceIcon: JSX.Element;
    let resourceLabel: string;
    let resourceRating: number;

    if (!isLoading && reviewsResourceType === ResourceType.SITE) {
        resourceIcon = <SiteIcon className="icon"/>;
        resourceLabel = (resource as Domain).domain;
        resourceRating = resource.rating;
    } else if (!isLoading && reviewsResourceType === ResourceType.PAGE) {
        resourceIcon = <PageIcon className="icon"/>;
        resourceLabel = pageInfo.title || pageInfo.url;
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
                                currentValue={reviewsResourceType}
                                disabled={isReviewsLoading || isLoading}/>
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
    const className = "resource-info";

    if (isLoading) {
        return (
            <div className={className}>
                <Spinner size={26}/>
            </div>
        );
    }

    return (
        <div className={className}>
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
