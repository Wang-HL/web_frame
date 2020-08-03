import React, { Component } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  TableOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  BankOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import MenuList from './menu';


const SubMenu = Menu.SubMenu;

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nav: [],
      current: '',
      subMenu: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.navHandle = this.navHandle.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }

  componentDidMount() {
    this.getNavList();
  }

  handlePathname(pathname) {
    let result = '';
    let subMenu = [];
    switch (pathname) {
      case '/sys':
      case '/sys/':
        result = '/sys/';
        break;
      case '/sys/welcome':
        result = '/sys/welcome';
        break;
      case '/sys/user':
        result = '/sys/user';
        break;
      default:
        result = '/sys/';
    }

    return [result, subMenu];
  }

  handleIcon(name) {
    switch (name) {
      case 'HomeOutlined':
        return <HomeOutlined />;
      case 'UserOutlined':
        return <UserOutlined />;
      case 'UsergroupAddOutlined':
        return <UsergroupAddOutlined />;
      case 'TableOutlined':
        return <TableOutlined />;
      case 'ProjectOutlined':
        return <ProjectOutlined />;
      case 'QuestionCircleOutlined':
        return <QuestionCircleOutlined />;
      case 'BankOutlined':
        return <BankOutlined />;
      default:
        return '';
    }
  }

  async getNavList() {
    // const user = window.localStorage.getItem('user');
    // const navID = user ? JSON.parse(user).menu_ids.split(',') : [];
    // const navData = navID.map(itemID => {
    //   return MenuList.filter(item => item.id === itemID)[0];
    // })
    const nav = MenuList;
    const navList = nav.filter(n => !n.belong && n.display);
    const middleNavList = nav.filter(n => n.belong && !n.rootNode && n.display);
    const rootNavList = nav.filter(n => n.rootNode && n.display);

    rootNavList.forEach(rNL => {
      middleNavList.forEach(mNL => {
        if (mNL.route === rNL.belong) {
          mNL.include = Array.isArray(mNL.include) ? [...mNL.include, rNL] : [rNL];
        }
      });
    });

    middleNavList.forEach(mNL => {
      navList.forEach(nL => {
        if (nL.route === mNL.belong) {
          nL.include = Array.isArray(nL.include) ? [...nL.include, mNL] : [mNL];
        }
      });
    });

    const [current, subMenu] = this.handlePathname(window.location.pathname);
    this.setState({
      nav: navList,
      current,
      subMenu,
    });
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
  }

  navHandle(systemItem) {
    if (systemItem.include && systemItem.include.length) {
      return (
        <SubMenu key={systemItem.route} title={<span>{this.handleIcon(systemItem.icon)}<span>{systemItem.name}</span></span>}>
          {systemItem.include.map(moduleItem => {
            if (moduleItem.include && moduleItem.include.length) {
              return (
                <SubMenu key={moduleItem.route} title={moduleItem.name}>
                  {moduleItem.include.map(webItem => (<Menu.Item key={webItem.route}><Link to={webItem.route}>{webItem.name}</Link></Menu.Item>))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={moduleItem.route}><Link to={moduleItem.route}>{moduleItem.name}</Link></Menu.Item>
              );
            }
          })}
        </SubMenu>
      );
    } else {
      return (<Menu.Item key={systemItem.route}><Link to={systemItem.route}>{this.handleIcon(systemItem.icon)}<span>{systemItem.name}</span></Link></Menu.Item>);
    }
  }

  onOpenChange(openKeys) {
    this.setState({ subMenu: openKeys });
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        openKeys={this.state.subMenu}
        onOpenChange={this.onOpenChange}
        selectedKeys={[this.state.current]}
        onClick={this.handleClick}
      >
        {this.state.nav.map(n => this.navHandle(n))}
      </Menu>
    );
  }
}