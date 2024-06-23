import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useUsersContactFormsPageStore} from "./UsersContactFormsPageStore";
import {Button, PaginationProps, Table, TableProps, Tag} from "antd";
import {ContactForm} from "../../model/ContactForm";
import Title from "antd/lib/typography/Title";
import {CheckCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {toJS} from "mobx";

export const USERS_CONTACT_FORMS = "/users-contact-forms";

const getTableProps = (markContactForm: (contactForm: ContactForm, read: boolean) => Promise<void>): TableProps<ContactForm>['columns'] => {
    return [
        {
            title: "Status",
            dataIndex: "read",
            key: "read",
            render: (_, record) => record.read
                ? <Tag bordered={false} icon={<CheckCircleOutlined/>}>PROCESSED</Tag>
                : <Tag color="success" bordered={false} icon={<ExclamationCircleOutlined/>}> NEW</Tag>,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            render: value => value
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: value => value
        },
        {
            title: "Date",
            dataIndex: "creationDate",
            key: "creationDate",
            render: (_, record) => record.creationDate.toISOString()
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                record.read
                    ? <Button icon={<ExclamationCircleOutlined/>} onClick={() => markContactForm(record, false)}>Mark as NEW</Button>
                    : <Button type="primary" icon={<CheckCircleOutlined/>} onClick={() => markContactForm(record, true)}>Mark as READ</Button>
            ),
        }
    ]
}

const UsersContactFormsPage: React.FC = () => {
    const store = useUsersContactFormsPageStore();
    const {isLoading, contactForms, totalFormsCount, loadContactForms, markContactForm} = store;

    useEffect(() => {
        store.init();
    }, []);

    const onPageChange: PaginationProps['onChange'] = (page) => {
        loadContactForms(page - 1);
    };

    return (
        <div className="users-contact-form-container">
            <Title level={3} style={{marginTop: 0, marginBottom: 10}}>Users contact forms</Title>
            <Table columns={getTableProps(markContactForm)}
                   dataSource={toJS(contactForms)}
                   loading={isLoading}
                   pagination={{total: totalFormsCount, onChange: onPageChange}}
                   rowKey={record => record.id}
                   expandable={{expandedRowRender: contactForm => contactForm.text}}/>
        </div>
    )
}

export default observer(UsersContactFormsPage);
