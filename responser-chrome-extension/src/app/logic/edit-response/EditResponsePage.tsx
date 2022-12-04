import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useEditResponsePageStore} from "./EditResponsePageStore";
import {Button} from "../../components/button/Button";
import {navigateTo} from "../../utils/NavigationUtils";
import {RESPONSES_PAGE_URL} from "../responses/ResponsesPage";
import EditResponseForm from "./EditResponseForm";
import {useQuery} from "../../../router";
import "./EditResponsePage.less";

type EditResponsePageProps = {
    responseId: string;
    resourceId: string;
}

const EditResponsePage: React.FC<EditResponsePageProps> = observer((props: EditResponsePageProps) => {
    const {responseId, resourceId} = props;
    const store = useEditResponsePageStore();
    const {init, responseData, saveResponse} = store;

    useEffect(() => {
        init(responseId, resourceId);
    }, [responseId]);

    const onCancelClick = () => {
        navigateTo(RESPONSES_PAGE_URL);
    }

    const onSubmit = async () => {
        await saveResponse();
        navigateTo(RESPONSES_PAGE_URL);
    }

    return (
        <div className="create-response-page">
            <Button onClick={onCancelClick}>Cancel</Button>
            <EditResponseForm responseData={responseData} onSubmit={onSubmit}/>
        </div>
    );
});

export const EDIT_RESPONSE_PAGE_URL = "/edit-response";

export const getEditResponsePageUrl = (responseId: string) => {
    return `${EDIT_RESPONSE_PAGE_URL}?responseId=${responseId}`;
};

export const getNewResponsePageUrl = (resourceId: string) => {
    return `${EDIT_RESPONSE_PAGE_URL}?resourceId=${resourceId}`;
};

export const editResponsePageRender = () => {
    const query = useQuery();
    return <EditResponsePage responseId={query.get("responseId")} resourceId={query.get("resourceId")}/>;
}
