import React from 'react';
import md5 from 'md5';

import { Fetch } from 'axiosModules';


export default function operatingUser() {
  const [form] = Form.useForm();
  
  const onFinish = async values => {
    const { password: pwd, ...orthers } = values;
    const md5Pwd = md5(pwd);
    
    try {
      const result = await Fetch('/api/user/update', 'POST', { password: md5Pwd, ...orthers });
      console.log(result);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Form
      name="userForm"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="昵称"
        name="nickname"
        rules={[{ required: true, message: 'Please input your nickname!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="用户名"
        name="username"
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

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}