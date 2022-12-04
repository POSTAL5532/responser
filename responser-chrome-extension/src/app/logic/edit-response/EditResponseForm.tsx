import React, {ChangeEvent} from "react";
import {Button} from "../../components/button/Button";
import {observer} from "mobx-react";
import {ResponseData} from "../../model/ResponseData";

type EditResponseFormProps = {
    responseData: ResponseData;
    onSubmit: () => void;
}

const EditResponseForm: React.FC<EditResponseFormProps> = (props: EditResponseFormProps) => {
    const {responseData, onSubmit} = props;

    const onRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
        responseData.rating = Number.parseInt(event.target.value);
    }

    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        responseData.text = event.target.value;
    }

    return(
        <div>
            <div className="rating-container">
                <input type="number" min={1} max={5} step={1} value={responseData?.rating} onChange={onRatingChange}/>
            </div>
            <div className="text-container">
                <textarea name="response" value={responseData?.text} onChange={onTextChange}/>
            </div>
            <Button onClick={onSubmit}>Leave response</Button>
        </div>
    )
}

export default observer(EditResponseForm)
