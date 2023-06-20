import React from "react";
import classNames from "classnames";
import {ReactComponent as SiteIcon} from './site-icon.svg';
import {ReactComponent as PageIcon} from './page-icon.svg';
import {ResourceType} from "../../../model/ResourceType";
import {TabOption, Tabs} from "../../../components/tabs/Tabs";
import {PageInfo} from "../../../model/PageInfo";
import {Spinner} from "../../../components/spinner/Spinner";
import {WebResource} from "../../../model/WebResource";
import {UrlUtils} from "../../../utils/UrlUtils";
import "./ReviewsHeader.less";

type ReviewsHeaderProps = {
    reviewsResourceType: ResourceType;
    onResourceTypeChange: (resourceType: ResourceType) => void;
    resource: WebResource;
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

    if (!isLoading) {
        const isSite = resource.resourceType === ResourceType.SITE;

        resourceIcon = isSite ? <SiteIcon className="icon"/> : <PageIcon className="icon"/>;
        resourceLabel = isSite ? UrlUtils.getHostFromUrl(pageInfo.url) : UrlUtils.preparePageUrl(pageInfo.url);
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

    let ratingLevel;

    if (resourceRating >= 4) {
        ratingLevel = "good-rating";
    } else if (resourceRating >= 2) {
        ratingLevel = "medium-rating";
    } else {
        ratingLevel = "bad-rating";
    }

    return (
        <div className={className}>
            {resourceIcon}
            <div className="label">{resourceLabel}</div>
            {
                !!resourceRating &&
                <div className={classNames("rating", ratingLevel)}>
                    <span>{resourceRating.toPrecision(2)} / 5</span>
                </div>
            }
        </div>
    );
}
