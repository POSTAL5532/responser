import React from "react";
import {Icon, IconType} from "../../../components/icon/Icon";
import {FacebookShareButton, LinkedinShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, VKShareButton} from "react-share";
import ApplicationProperties from "../../../service/ApplicationProperties";

type ShareReviewSubmenuProps = {
    reviewId: string;
}

export const ShareReviewSubmenu: React.FC<ShareReviewSubmenuProps> = (props: ShareReviewSubmenuProps) => {
    const url = ApplicationProperties.reviewWebLinkUrl + "/" + props.reviewId;
    const shareButtonsClassName = "button primary share-button";

    return (
        <div className="share-review-submenu">
            <div className="share-row first-row">
                <FacebookShareButton url={url} hashtag="#reviewly" resetButtonStyle={false} className={shareButtonsClassName}>
                    <Icon type={IconType.FB_LOGO}/>
                </FacebookShareButton>

                <TwitterShareButton url={url} hashtags={["#reviewly"]} resetButtonStyle={false} className={shareButtonsClassName}>
                    <Icon type={IconType.X_LOGO}/>
                </TwitterShareButton>

                <TelegramShareButton url={url} resetButtonStyle={false} className={shareButtonsClassName}>
                    <Icon type={IconType.TG_LOGO}/>
                </TelegramShareButton>
            </div>

            <div className="share-row second-row">
                <LinkedinShareButton url={url} resetButtonStyle={false} className={shareButtonsClassName}>
                    <Icon type={IconType.LI_LOGO}/>
                </LinkedinShareButton>

                <RedditShareButton url={url} resetButtonStyle={false} className={shareButtonsClassName}>
                    <Icon type={IconType.REDDIT_LOGO}/>
                </RedditShareButton>

                <VKShareButton url={url} resetButtonStyle={false} className={shareButtonsClassName}>
                    <Icon type={IconType.VK_LOGO}/>
                </VKShareButton>
            </div>
        </div>
    );
}