import React, { Component } from 'react';
import { Layout, Tooltip, message, Modal } from 'antd';
import {
  PoweroffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import style from './style.css';

import { Fetch } from 'fetchModules';

const { confirm } = Modal;
const { Header } = Layout;

class Head extends Component {
  static propTypes = {
    toggle: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.logout = this.logout.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    
  }
  
  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    const user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};
    this.setState({ name: user.name }) 
  }
  logout() {
    const that = this
    confirm({
      title: '是否确定登出系统 ?',
      icon: <ExclamationCircleOutlined />,
      okText: '登出',
      cancelText: '取消',
      async onOk() {
        try {
          const res = await Fetch('/api/backend/logout');
          const { error } = res;
          if (error) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            that.props.history.push({
              pathname: '/sys/login',
              state: {
               msg: '登出成功！',
               type: 'success'
              }
            })
          }
        } catch(err) {
          message.error(err.message);
        }
      },
      onCancel() {},
    });
  }

  render() {
    return (
      <Header style={this.props.style} className={style.header}>
        <span onClick={this.props.toggle}>
          {
            this.props.collapsed ? <MenuUnfoldOutlined className={style.trigger} /> : <MenuFoldOutlined className={style.trigger} />
          }
        </span>
        <div className={style.placeholder}></div>
        <label className={style.label}>Hi, {this.state.name}</label>
        <Tooltip placement='bottom' title='登出账号' style={{ display: 'flex', alignItems: 'center' }}><PoweroffOutlined className={style.logout} onClick={this.logout} /></Tooltip>
      </Header>
    );
  }
}


export default withRouter(Head);