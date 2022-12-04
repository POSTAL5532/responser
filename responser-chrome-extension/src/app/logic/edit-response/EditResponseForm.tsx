import React, {ChangeEvent} from "react";
import {observer} from "mobx-react";
import {Button} from "../../components/button/Button";
import {ResponseData} from "../../model/ResponseData";
import {Rating} from "../../components/rating/Rating";

type EditResponseFormProps = {
    responseData: ResponseData;
    onSubmit: () => void;
}

const EditResponseForm: React.FC<EditResponseFormProps> = (props: EditResponseFormProps) => {
    const {responseData, onSubmit} = props;

    const onRatingChange = (rating: number) => {
        responseData.rating = rating;
    }

    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        responseData.text = event.target.value;
    }

    return (
        <div>
            <div className="rating-container">
                <Rating value={responseData?.rating} onChange={onRatingChange}/>
            </div>
            <div className="text-container">
                <textarea name="response" value={responseData?.text} onChange={onTextChange}/>
            </div>
            <Button onClick={onSubmit}>Leave response</Button>
        </div>
    )
}

export default observer(EditResponseForm)
