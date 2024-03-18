import React from "react";
import {FacebookShareButton, LinkedinShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, VKShareButton,} from "react-share";
import Modal from "../../../components/modal/Modal";
import ApplicationProperties from "../../../service/ApplicationProperties";
import {Review} from "../../../model/Review";
import {Icon, IconType} from "../../../components/icon/Icon";
import "./ShareReviewModal.less";

type ShareReviewModalProps = {
    show: boolean;
    review: Review;
    onClose: () => void;
}

export const ShareReviewModal: React.FC<ShareReviewModalProps> = (props: ShareReviewModalProps) => {
    const {show, review, onClose} = props;
    const url = ApplicationProperties.reviewWebLinkUrl + "/" + review?.id;
    const shareButtonsClassName = "button primary share-button";

    return (
        <Modal isOpen={show} className="share-review-modal" onClose={onClose}>
            <Modal.Body>
                <div className="share-buttons">
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
            </Modal.Body>
        </Modal>
    );
}
