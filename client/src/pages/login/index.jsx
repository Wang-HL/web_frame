import React, { Component } from 'react';
import md5 from 'md5';
import { Form, Input, Button, Icon, message } from 'antd';

// import { Fetch } from 'fetchModules';
import { Fetch } from 'axiosModules';
import styles from './index.css';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    onFinish = async values => {
        console.log('Success:', values);
        const { password: pwd, ...orthers } = values;
        const pwdMD5 = md5(pwd);
        const result = await Fetch('/api/loginSys', 'POST', { ...orthers, password: pwdMD5 });
        console.log(result);
        return;
        const res = await result.json();
        const { msg, status } = res;
        if (status) {
            message.success(msg, 2, () => {
                this.props.history.replace('/user');
            });
        } else {
            message.error(msg);
        }
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div className={styles.loginBox}>
                <Form
                    name="basic"
                    className={styles.loginForm}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Login in</Button>
                </Form>
            </div>
        );
    }
}
