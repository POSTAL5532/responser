import Title from "antd/lib/typography/Title";
import {Layout} from "antd";
import React from "react";

export const AppHeader:React.FC = () => {
    return(
        <Layout.Header style={{padding: 0, background: "white"}}>
            <Title level={2} style={{marginTop: 10, marginLeft: 10}} type="secondary">Reviewly console</Title>
        </Layout.Header>
    );
}
