import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {Badge, Button, PaginationProps, Table, TableProps} from "antd";
import {ControlOutlined, GoogleOutlined, IdcardOutlined} from "@ant-design/icons";
import {User} from "../../model/User";
import {RegisteredBy} from "../../model/RegisteredBy";
import {navigateTo} from "../../utils/NavigationUtils";
import {useUsersPageStore} from "./UsersPageStore";
import Title from "antd/lib/typography/Title";
import {toJS} from "mobx";

export const USERS_URL = "/users";

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
        },
        {
            title: "Spam count",
            dataIndex: "userSpamIndicator",
            render: (_, record) => {
                if (!!record.userSpamIndicator) {
                    return <Badge count={record.userSpamIndicator.spamCounter}
                                  showZero
                                  status={record.userSpamIndicator.spamCounter > 1 ? "error" : "warning"}/>
                }

                return <>0</>
            }
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" icon={<ControlOutlined/>} onClick={() => navigateTo(`${USERS_URL}/${record.id}`)}>Details</Button>
            ),
        }
    ]
}

const UsersPage: React.FC = () => {
    const {isLoading, users, totalUsersCount, init, loadUsers} = useUsersPageStore();

    useEffect(() => {
        init();
    }, []);

    const onPageChange: PaginationProps['onChange'] = (page) => {
        loadUsers(page - 1);
    };

    return (
        <div className="users-list-container">
            <Title level={3} style={{marginTop: 0, marginBottom: 10}}>Users</Title>
            <Table columns={getTableProps()}
                   dataSource={toJS(users)}
                   loading={isLoading}
                   pagination={{total: totalUsersCount, onChange: onPageChange}}
                   rowKey={record => record.id}/>
        </div>
    );
}

export default observer(UsersPage);
