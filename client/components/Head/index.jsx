import React, {
  Component
} from 'react';
import {
  Layout,
  Icon,
  Tooltip,
  message,
} from 'antd';
import PropTypes from 'prop-types';

import style from './style.css';

import { Fetch } from 'fetchModules';

const {
  Header
} = Layout;


class Head extends Component {
  static propTypes = {
    toggle: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.logout = this.logout.bind(this);
    // this.getUserInfo = this.getUserInfo.bind(this);
    
  }
  
  // componentDidMount() {
  //   this.getUserInfo();
  // }

  async getUserInfo() {
    try {
      const res = await Fetch('/api/getUserInfo');
      const resJSON = await res.json();
      const { status, message: msg, result } = resJSON;
      
      if(!status) {
        message.error(msg);
        return false;
      }
      this.setState({name: result.name})

    } catch (err) {
      console.log(err);
      message.error('获取身份提示出错！');
    }

  }
  async logout() {
    try {
      const res = await Fetch('/sys/logout', 'DELETE');

      const resJSON = await res.json();

      if (resJSON.status) {
        message.success('logout success');
        window.localStorage.removeItem('token');
        window.location.href = '/sys/login';
      } else {
        message.error('logout error, try again');
      }
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Header style={this.props.style} className={style.header}>
        <Icon className={style.trigger} type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.toggle} />
        <div className={style.placeholder}></div>
        <label className={style.label}>Hi, {this.state.name}</label>
        <Tooltip placement='bottom' title='logout'><Icon className={style.logout} type='poweroff' onClick={this.logout} /></Tooltip>
      </Header>
    );
  }
}


export default Head;