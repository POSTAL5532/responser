import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useParams} from "react-router";
import {useUserDetailsPageStore} from "./UserDetailsPageStore";
import {Avatar, Button, Card, Descriptions, Skeleton, Tag} from "antd";
import Meta from "antd/lib/card/Meta";
import {getUserAvatarUrl} from "../../utils/ResourcesUtils";
import {Role} from "../../model/Role";
import {RoleName} from "../../model/RoleName";
import type {LiteralUnion} from "antd/es/_util/type";
import type {PresetColorType, PresetStatusColorType} from "antd/es/_util/colors";
import {CheckCircleFilled, CheckOutlined, ExclamationCircleFilled, LockOutlined} from "@ant-design/icons";
import {Typography} from 'antd';

const {Text} = Typography;

const getRoleTagColor = (roleName: RoleName): LiteralUnion<PresetColorType | PresetStatusColorType> => {
    switch (roleName) {
        case RoleName.ADMIN:
            return "purple"
        case RoleName.USER:
            return "success"
        case RoleName.USER_BLOCKED:
            return "red"
        default:
            return "default"
    }
}

const UserDetailsPage: React.FC = () => {
    const {userId} = useParams<{ userId: string }>();
    const {user, isLoading, init, blockUser, unblockUser} = useUserDetailsPageStore();

    useEffect(() => {
        if (!!userId) {
            init(userId);
        }
    }, [userId]);

    const getRolesTags = (roles: Role[]) => {
        if (!roles) {
            return [];
        }

        return roles.map(role => <Tag key={role.id} color={getRoleTagColor(role.name)}>{role.name}</Tag>)
    }

    return (
        <div>
            <Card style={{marginBottom: 20}}>
                <Skeleton loading={isLoading} avatar active>
                    <Meta
                        avatar={<Avatar size="large" src={getUserAvatarUrl(user)} style={{width: 100, height: 100}}/>}
                        title={user?.fullName}
                        description={
                            <Descriptions column={1}>
                                <Descriptions.Item label="ID">{user?.id}</Descriptions.Item>
                                <Descriptions.Item label="Email">
                                    <Text>
                                        {user?.email} {user?.emailConfirmed ? <CheckCircleFilled style={{color: "green"}}/> :
                                        <ExclamationCircleFilled style={{color: "tomato"}}/>}
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Registered">{user?.creationDate.toISOString()}</Descriptions.Item>
                                <Descriptions.Item label="Updated">{!!user?.updateDate ? user?.updateDate?.toISOString() : '-'}</Descriptions.Item>
                                <Descriptions.Item label="Role">{getRolesTags(user?.roles)}</Descriptions.Item>
                            </Descriptions>
                        }/>
                </Skeleton>
            </Card>

            {
                !user?.roles.find(role => role.name === RoleName.USER_BLOCKED)
                    ? <Button icon={<LockOutlined/>} onClick={blockUser} type="primary">Block user</Button>
                    : <Button icon={<CheckOutlined/>} onClick={unblockUser} type="primary">Unblock user</Button>
            }
        </div>
    );
}

export default observer(UserDetailsPage);
