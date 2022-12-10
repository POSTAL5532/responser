import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {useReviewsPageStore} from "./ReviewsPageStore";
import {Domain} from "../../model/Domain";
import ReviewsList from "./ReviewsList";
import {Button} from "../../components/button/Button";
import {GlobalAppStore, GlobalAppStoreContext} from "../../GlobalAppStore";
import {Page} from "../../components/page/Page";
import {navigateTo} from "../../utils/NavigationUtils";
import {getNewReviewPageUrl} from "../edit-review/EditReviewPage";
import "./ReviewsPage.less";

export const REVIEWS_PAGE_URL = "/reviews";

const ReviewsPage: React.FC = () => {
    const {currentUser, isLoading} = useContext<GlobalAppStore>(GlobalAppStoreContext);
    const {domain, resource, reviews, init} = useReviewsPageStore();

    useEffect(() => {
        if (!isLoading) init(currentUser?.id);
    }, [isLoading]);

    const onLeaveReviewClick = () => {
        navigateTo(getNewReviewPageUrl(resource.id));
    }

    return (
        <Page className="reviews-page">
            <div className="header">
                {domain ? <div className="domain">{domain.domain}</div> : "LOADING..."}
                {resource ? <div className="resource">{resource.name}</div> : "LOADING..."}
            </div>

            <ReviewsList reviews={reviews}/>

            <div className="leave-review-container">
                <Button disabled={!currentUser} onClick={currentUser ? onLeaveReviewClick : undefined}>
                    {currentUser ? "Leave review" : "SignIn for review"}
                </Button>
            </div>
        </Page>
    );
}

export default observer(ReviewsPage);

type DomainCardProps = {
    domain: Domain;
}

const DomainCard: React.FC<DomainCardProps> = (props: DomainCardProps) => (
    <div className="domain">{props.domain.domain}</div>
);
