import React, { Component } from 'react';
import { Button, message, Breadcrumb, PageHeader, Card, Table } from 'antd';

import { Fetch } from 'fetchModules';
import UserTableForm from './userTableForm';
import columns from './columns';
import styles from './index.css';


export default class UserManagementHandle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [
                {
                    path: '/sys/',
                    breadcrumbName: '首页',
                },
                {
                    path: '/sys/user',
                    breadcrumbName: '用户管理',
                },
            ],
            dataSource: [
                {
                    key: '1',
                    username: 'hyb',
                    nickname: '胡彦斌',
                    createTime: '2020-09-09',
                },
                {
                    key: '2',
                    username: 'wyz',
                    nickname: '吴彦祖',
                    createTime: '2020-01-01',
                },
            ]
        }
    }

    formRef = React.createRef();

    onFinish = (values) => {
        console.log(values)
    }

    render() {
        const routes = this.state.routes;
        return (
            <div>
                <PageHeader
                    className={styles.site_page_header}
                    title="用户管理"
                    breadcrumb={{ routes }}
                />

                <div className={styles.container_children_content}>
                    <div className={styles.table_search}>
                        <UserTableForm className={styles.form_box} />
                    </div>
                    <Card>
                        <div className={styles.table_toolbar}>
                            <p className={styles.table_toolbar_title}>用户表格</p>
                            <Button type="primary">新增用户</Button>
                        </div>
                        <Table dataSource={this.state.dataSource} columns={columns} />;
                    </Card>
                </div>
            </div>
        )
    }
}