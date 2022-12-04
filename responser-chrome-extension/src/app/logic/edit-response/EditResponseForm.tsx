import React, {ChangeEvent} from "react";
import {observer} from "mobx-react";
import {Button} from "../../components/button/Button";
import {ResponseData} from "../../model/ResponseData";
import {Rating} from "../../components/rating/Rating";
import {Textarea} from "../../components/form/Textarea";

type EditResponseFormProps = {
    responseData: ResponseData;
    onSubmit: () => void;
    onCancel: () => void;
}

const EditResponseForm: React.FC<EditResponseFormProps> = (props: EditResponseFormProps) => {
    const {responseData, onSubmit, onCancel} = props;

    const onRatingChange = (rating: number) => {
        responseData.rating = rating;
    }

    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        responseData.text = event.target.value;
    }

    return (
        <>
            <div className="rating-container">
                <Rating value={responseData?.rating} onChange={onRatingChange}/>
                <Button onClick={onCancel} outlined={true}>Cancel</Button>
            </div>
            <div className="text-container">
                <Textarea name="response" value={responseData?.text} onChange={onTextChange}/>
            </div>
            <div className="leave-response-container">
                <Button onClick={onSubmit} disabled={!responseData?.text}>Leave response</Button>
            </div>
        </>
    )
}

export default observer(EditResponseForm)
