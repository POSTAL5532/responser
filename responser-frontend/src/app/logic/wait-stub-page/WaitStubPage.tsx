import React from "react";
import {Spinner} from "../../components/spinner/Spinner";
import Page from "../../components/page/Page";
import "./WaitStubPage.less";

export const WaitStubPage: React.FC = () => (
    <Page className="wait-stub-page">
        <p>Wait for a moment</p>
        <Spinner/>
    </Page>
)