import React from "react";
import {ResourceType} from "../../../model/ResourceType";
import {TabOption, Tabs} from "../../../components/tabs/Tabs";
import {Spinner} from "../../../components/spinner/Spinner";
import {WebResource} from "../../../model/WebResource";
import {AppHeader} from "../../../components/app-header/AppHeader";
import {Icon, IconType} from "../../../components/icon/Icon";
import {Toggler} from "../../../components/toggler/Toggler";
import "./ReviewsHeader.less";

type ReviewsHeaderProps = {
    reviewsResourceType: ResourceType;
    onResourceTypeChange: (resourceType: ResourceType) => void;
    resource: WebResource;
    isLoading: boolean;
    isReviewsLoading: boolean;
    notificationsEnabled: boolean;
    toggleNotifications: (toggle: boolean) => void;
}

export const ReviewsHeader: React.FC<ReviewsHeaderProps> = (props: ReviewsHeaderProps) => {
    const {
        reviewsResourceType,
        resource,
        isLoading,
        isReviewsLoading,
        onResourceTypeChange,
        notificationsEnabled,
        toggleNotifications
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
            return <p className="resource-type">Reviewly</p>;
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

    const getNotificationsControl = () => (
        <Toggler checked={notificationsEnabled} onChange={toggleNotifications} label="Notifications"/>
    );

    return (
        <AppHeader headerLabel={getHeaderLabel()} className="reviews-header" controls={getNotificationsControl()}>
            <Tabs<ResourceType>
                onChange={onResourceTypeChange}
                options={resourceTypeOptions}
                currentValue={reviewsResourceType}
                disabled={isReviewsLoading || isLoading}/>
        </AppHeader>
    )
}
