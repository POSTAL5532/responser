import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {Review} from "../../../model/Review";
import Modal from "../../../components/modal/Modal";
import {ResourceType} from "../../../model/ResourceType";
import {Spinner} from "../../../components/spinner/Spinner";
import {Button, ButtonType} from "../../../components/button/Button";
import {Rating} from "../../../components/rating/Rating";
import {Link} from "../../../components/link/Link";
import {Icon, IconType} from "../../../components/icon/Icon";
import {getWebResourceIconUrl} from "../../../utils/ResourcesUtils";
import {UrlUtils} from "../../../utils/UrlUtils";
import {TextArea, TextAreaStyleType} from "../../../components/form/text-area/TextArea";
import {ReviewData} from "../../../model/ReviewData";
import "./EditReviewModal.less";

const MAX_REVIEW_TEXT_LENGTH = 460;

type EditReviewModalProps = {
    show: boolean;
    editingReview: Review;
    editingReviewData: ReviewData;
    reviewIsLoading: boolean;
    reviewIsSaving: boolean;
    onClose: () => void;
    onSave: () => void;
}

const EditReviewModal: React.FC<EditReviewModalProps> = (props: EditReviewModalProps) => {
    const {show, editingReviewData, editingReview, reviewIsLoading, reviewIsSaving, onClose, onSave} = props;
    const [reviewOldText, setReviewOldText] = useState<string>(null);
    const [reviewOldRating, setReviewOldRating] = useState<number>(null);

    useEffect(() => {
        if (!!editingReviewData) {
            setReviewOldText(editingReviewData.text);
            setReviewOldRating(editingReviewData.rating);
        }
    }, [editingReviewData])

    const getHeaderContent = () => {
        if (reviewIsLoading || !editingReviewData) {
            return <Spinner/>
        }

        const rootWebResource = !editingReview.webResource.parent ? editingReview.webResource : editingReview.webResource.parent;
        const webResourceHost = UrlUtils.getHostFromUrl(rootWebResource.url);

        return (
            <>
                <img className="web-resource-icon" src={getWebResourceIconUrl(editingReview.webResource)} alt={webResourceHost}/>
                <p className="resource-name">{webResourceHost}</p>
            </>
        );
    }

    const onReviewTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length > MAX_REVIEW_TEXT_LENGTH) return;
        editingReviewData.text = event.target.value;
    }

    const saveButtonIsDisabled = reviewIsLoading || reviewIsSaving || (editingReviewData?.text.trim() == reviewOldText && editingReviewData?.rating == reviewOldRating);

    return (
        <Modal isOpen={show} className="edit-review-modal">
            <Modal.Header onClose={onClose}>
                <div className="web-resource-info">{getHeaderContent()}</div>
                <div className="modal-header-label">
                    Edit {editingReview?.webResource.resourceType == ResourceType.PAGE ? "page" : "site"} review
                </div>
            </Modal.Header>

            <Modal.Body>
                {
                    !reviewIsLoading && !!editingReview && !!editingReviewData
                        ? <div className="edit-review-form">
                            <Link className="resource-link" href={editingReview.webResource.url} target="_blank">
                                <Icon type={IconType.EXTERNAL_LINK}/> {editingReview.webResource.url}
                            </Link>

                            <p className="label rating-label">Rating:</p>
                            <Rating value={editingReviewData.rating} onChange={value => editingReviewData.rating = value}/>

                            <p className="label text-label">Review text:</p>
                            <TextArea
                                styleType={TextAreaStyleType.SECONDARY}
                                className="review-text-input"
                                disabled={reviewIsSaving}
                                value={editingReviewData.text}
                                onChange={onReviewTextChange}/>

                            <span className="text-length-indicator">{editingReviewData.text.length} / 460</span>
                        </div>
                        : <div className="review-loading"><Spinner/></div>
                }
            </Modal.Body>

            <Modal.Footer>
                <Button styleType={ButtonType.PRIMARY} onClick={onSave} disabled={saveButtonIsDisabled}><Icon type={IconType.CHECK}/> Save</Button>
                <Button className="cancel-button" onClick={onClose}><Icon type={IconType.CLOSE}/> Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default observer(EditReviewModal)
