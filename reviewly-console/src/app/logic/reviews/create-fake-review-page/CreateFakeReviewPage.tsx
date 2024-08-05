import React from "react";
import {observer} from "mobx-react";
import {Button, Divider, Input, Modal, PaginationProps, Radio, Slider, Space, Table, TableProps} from "antd";
import {ResourceType} from "../../../model/ResourceType";
import {useCreateFakeReviewPageStore} from "./CreateFakeReviewPageStore";
import Title from "antd/lib/typography/Title";
import {toJS} from "mobx";
import {User} from "../../../model/User";
import {RegisteredBy} from "../../../model/RegisteredBy";
import {GoogleOutlined, IdcardOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import ApplicationProperties from "../../../service/ApplicationProperties";
import {reloadPage} from "../../../utils/NavigationUtils";
import "./CreateFakeReviewPage.less";

export const CREATE_FAKE_REVIEW_PAGE_URL = "/reviews/create-fake";

const getTableProps = (): TableProps<User>['columns'] => {
    return [
        {
            title: "Full name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Registered",
            dataIndex: "creationDate",
            render: (_, record) => record.creationDate.toISOString()
        },
        {
            title: "Registered By",
            dataIndex: "registeredBy",
            render: (_, record) => {
                switch (record.registeredBy) {
                    case RegisteredBy.GOOGLE:
                        return <><GoogleOutlined/> Google</>;
                    case RegisteredBy.NATIVE:
                        return <><IdcardOutlined/> Native</>;
                    case RegisteredBy.FAKE:
                        return <>FAKE</>
                    default:
                        return null;
                }
            }
        }
    ]
}

const CreateFakeReviewPage: React.FC = () => {
    const createFakeReviewPageStore = useCreateFakeReviewPageStore();

    const {
        webResourceUrl,
        resourceType,
        isLoading,
        userFullName,
        reviewInfo,
        loadedUsers,
        totalUsersCount,
        triedUsersLoading,
        newReviewId,
        findOrCreateResource,
        loadUsers,
        createFakeUser,
        saveFakeReview
    } = createFakeReviewPageStore;

    const onPageChange: PaginationProps['onChange'] = (page) => {
        loadUsers(page - 1);
    };

    const onUserRowSelect = (selectedRowKeys: React.Key[], selectedRows: User[]) => {
        createFakeReviewPageStore.reviewInfo.userId = selectedRows[0].id;
    }

    return (
        <div className="create-fake-review-container">
            <Modal title="Fake review created" open={!!newReviewId} onOk={reloadPage} onClose={reloadPage} onCancel={reloadPage}>
                <p>Link to review is: <a href={`${ApplicationProperties.reviewWebLinkUrl}/${newReviewId}`} target="_blank">Click to go</a></p>
            </Modal>

            <Title level={3} style={{marginTop: 0, marginBottom: 30}}>Create fake review</Title>

            <div className="create-fake-review-block web-resource-parameters-container">
                <Title level={5} style={{marginTop: 0, marginBottom: 4}}>Fill the web resource data</Title>

                <Radio.Group className="resource-type-radio"
                             value={resourceType}
                             disabled={isLoading}
                             onChange={event => {
                                 createFakeReviewPageStore.resourceType = event.target.value;
                                 reviewInfo.resourceId = null;
                             }}>
                    <Radio value={ResourceType.SITE}>Site</Radio>
                    <Radio value={ResourceType.PAGE}>Page</Radio>
                </Radio.Group>

                <Space.Compact className="resource-url-input">
                    <Input placeholder="Enter the resource URL"
                           disabled={isLoading}
                           onChange={(event) => createFakeReviewPageStore.webResourceUrl = event.currentTarget.value}/>

                    <Button type={"primary"} onClick={findOrCreateResource} disabled={!webResourceUrl || isLoading} loading={isLoading}>
                        Find or create {resourceType}
                    </Button>
                </Space.Compact>
            </div>

            <Divider/>

            <div className="create-fake-review-block user-parameters-container">
                <Title level={5} style={{marginTop: 0, marginBottom: 4}}>Fill the review user data</Title>

                <Space.Compact className="user-full-name-input">
                    <Input placeholder="Enter the user full name"
                           disabled={isLoading}
                           onChange={(event) => createFakeReviewPageStore.userFullName = event.currentTarget.value}/>

                    <Button type={"primary"} onClick={() => loadUsers(0)} disabled={isLoading} loading={isLoading}>
                        Find fake users
                    </Button>
                </Space.Compact>

                <Table columns={getTableProps()}
                       dataSource={toJS(loadedUsers)}
                       size="small"
                       rowSelection={{type: "radio", onChange: onUserRowSelect}}
                       locale={{
                           emptyText: triedUsersLoading
                               ? <Button disabled={isLoading || !userFullName} onClick={createFakeUser}>Create user by full name</Button>
                               : "Try to fin users"
                       }}
                       loading={isLoading}
                       pagination={{total: totalUsersCount, onChange: onPageChange, pageSize: 5}}
                       rowKey={record => record.id}/>
            </div>

            <Divider/>

            <div className="create-fake-review-preview">
                <div className="review-ids">
                    <Input readOnly={true} addonBefore={`${resourceType} ID:`} value={reviewInfo?.resourceId}/>
                    <Input readOnly={true} addonBefore="User ID:" value={reviewInfo?.userId}/>
                </div>

                <Title level={5} style={{marginTop: 0, marginBottom: 4}}>Select review rating</Title>
                <Slider className="rating-slider"
                        tooltip={{open: true}}
                        min={1} max={5}
                        value={reviewInfo?.rating}
                        onChange={(value: number) => reviewInfo.rating = value}
                        disabled={isLoading}/>

                <TextArea rows={4} maxLength={460}
                          placeholder="Review text"
                          value={reviewInfo?.text}
                          onChange={event => reviewInfo.text = event.target.value}
                          disabled={isLoading}/>
            </div>

            <Button type="primary" size="large"
                    onClick={saveFakeReview}
                    disabled={isLoading || !reviewInfo?.text || !reviewInfo?.rating || !reviewInfo?.userId || !reviewInfo?.resourceId}
                    loading={isLoading}>
                Send
            </Button>
        </div>
    );
}

export default observer(CreateFakeReviewPage);
