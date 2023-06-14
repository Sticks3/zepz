import React, {useEffect, useState} from 'react';
import {Avatar, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {User} from '../models/user';
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import styles from './CollapsableTable.module.css'
import {CollapseDetails} from './CollapseDetails';
import {fetchUsers} from '../utils/fetching';

export const CollapsableTable = ({onError}: {onError: (message: any) => void}) => {

    const [users, setUsers] = useState<User[]>([]);

    const columns: ColumnsType<User> = [
        {
            title: '',
            align: 'center',
            render: (row: {profile_image: boolean}) => <Avatar src={row.profile_image} size={58}/>
        },
        {title: 'Name', dataIndex: 'display_name'},
        {title: 'Reputation', dataIndex: 'reputation'},
        {title: 'Followed', render: (row: {followed: boolean}) => <span>{JSON.stringify(row.followed)}</span>},
    ];

    const handleFollow = (e: CheckboxChangeEvent, record: User) => {
        record.followed = e.target.checked;
        setUsers(JSON.parse(JSON.stringify(findAndReplaceCorrectElement(record))));
    };

    const handleBlock = (e: CheckboxChangeEvent, record: User) => {
        record.blocked = e.target.checked;
        setUsers(JSON.parse(JSON.stringify(findAndReplaceCorrectElement(record))));
    };

    const findAndReplaceCorrectElement = (record: User) => {
        return users.map((user: User) => {
            if (user.user_id === record.user_id) {
                return record;
            }
            return user;
        });
    }

    // uncomment to allow server side pagination
    // const handleChange = async (pagination: TablePaginationConfig) => {
    //     await getStackUsers(pagination.current, pagination.pageSize);
    // };

    useEffect(() => {
        fetchUsers(1, 20).then((response) => {
            // followed and blocked are managed locally doing
            // server side pagination will reset these values

            // when blocking a user, the instructions were unclear,

            // Users that are blocked should show in a disabled greyed-out list item;
            // tapping on the item should not open the details view

            // `tapping on the item should not open the details view` implies that after blocking the user
            // the collapsed/expandable thing would close and that user would never be able to be unblocked,
            // I didn't do that, I left the expandable thing open
            setUsers(() => {
                const updatedUsers = response.items.map((user: User) => ({
                    ...user,
                    followed: false,
                    blocked: false,
                }));
                return [...updatedUsers];
            });
        }).catch((error) => {
            const {message}: any = error;
            onError(message);
        })
    }, [onError]);

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record) =>
                    <CollapseDetails onFollow={(event: CheckboxChangeEvent) => handleFollow(event, record)}
                                     onBlock={(event: CheckboxChangeEvent) => handleBlock(event, record)}/>,
            }}
            dataSource={users}
            rowKey="user_id"
            rowClassName={(record, index) => {
                return record.blocked ? styles.disabledRow : '';
            }}
            expandRowByClick={true}

            // uncomment to allow server side pagination
            // onChange={handleChange}
            // pagination={{
            //     position: ['bottomRight'],
            //     pageSize: 20,
            //     total: 500,
            // }}
        />
    );
}