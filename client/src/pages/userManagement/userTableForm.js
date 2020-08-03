import React from 'react'
import { Form, Row, Col, Input, Button, DatePicker, Space } from 'antd'


const { RangePicker } = DatePicker;

const UserTableForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} name="userForm-hooks" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="用户名" name="username" >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="昵称" name="nickname" >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="创建时间" name="createTime" >
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button htmlType="button" onClick={onReset}>重置</Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default React.memo(UserTableForm);