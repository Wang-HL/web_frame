import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { Fetch } from 'fetchModules';


const SubMenu = Menu.SubMenu;

// @connect(state => state)
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
      case '/sys/analysisManagement':
        result = '/sys/analysisManagement';
        break;
      case '/sys/testManagement/dialing/addDialing':
      case '/sys/testManagement/dialing/dialingList':
        result = '/sys/testManagement/dialing/dialingList';
        subMenu = ['/sys/testManagement', '/sys/testManagement/dialing'];
        break;
      case '/sys/testManagement/fraudInquire':
        result = '/sys/testManagement/fraudInquire';
        subMenu = ['/sys/testManagement/fraudInquire', '/sys/testManagement'];
        break;
      case '/sys/testManagement/identityVerify':
        result = '/sys/testManagement/identityVerify';
        subMenu = ['/sys/testManagement/identityVerify', '/sys/testManagement'];
        break;
      case '/sys/clientManagement/testHandle/accessApplyTable':
        result = '/sys/clientManagement/testHandle/accessApplyTable';
        subMenu = ['/sys/clientManagement/testHandle', '/sys/clientManagement'];
        break;
      case '/sys/clientManagement/testHandle/onlineTestList':
        result = '/sys/clientManagement/testHandle/onlineTestList';
        subMenu = ['/sys/clientManagement/testHandle', '/sys/clientManagement'];
        break;
      case '/sys/clientManagement/testHandle/offlineTestList':
        result = '/sys/clientManagement/testHandle/offlineTestList';
        subMenu = ['/sys/clientManagement/testHandle', '/sys/clientManagement'];
        break;
      case '/sys/clientManagement/purchaseHandle/orderList':
        result = '/sys/clientManagement/purchaseHandle/orderList';
        subMenu = ['/sys/clientManagement/purchaseHandle', '/sys/clientManagement'];
        break;
      case '/sys/clientManagement/purchaseHandle/supplementList':
        result = '/sys/clientManagement/purchaseHandle/supplementList';
        subMenu = ['/sys/clientManagement/purchaseHandle', '/sys/clientManagement'];
        break;
      case '/sys/companyManagement/businessHandle/businessList':
        result = '/sys/companyManagement/businessHandle/businessList';
        subMenu = ['/sys/companyManagement/businessHandle', '/sys/companyManagement'];
        break;
      case '/sys/companyManagement/businessHandle/transactionList':
        result = '/sys/companyManagement/businessHandle/transactionList';
        subMenu = ['/sys/companyManagement/businessHandle', '/sys/companyManagement'];
        break;
      case '/sys/systemManagement/userHandle/addUser':
      case '/sys/systemManagement/userHandle/editUser':
      case '/sys/systemManagement/userHandle/userList':
        result = '/sys/systemManagement/userHandle/userList';
        subMenu = ['/sys/systemManagement/userHandle', '/sys/systemManagement'];
        break;
      case '/sys/systemManagement/roleHandle/addRole':
      case '/sys/systemManagement/roleHandle/editRole':
      case '/sys/systemManagement/roleHandle/roleList':
        result = '/sys/systemManagement/roleHandle/roleList';
        subMenu = ['/sys/systemManagement/roleHandle', '/sys/systemManagement'];
        break;
      case '/sys/systemManagement/modulesHandle/addModules':
      case '/sys/systemManagement/modulesHandle/editModules':
      case '/sys/systemManagement/modulesHandle/modulesList':
        result = '/sys/systemManagement/modulesHandle/modulesList';
        subMenu = ['/sys/systemManagement/modulesHandle', '/sys/systemManagement'];
        break;
      case '/sys/systemManagement/operationHandle/operationList':
      case '/sys/systemManagement/operationHandle/addOperation':
        result = '/sys/systemManagement/operationHandle/operationList';
        subMenu = ['/sys/systemManagement/operationHandle', '/sys/systemManagement'];
        break;
      case '/sys/clientManagement/clientHandle/clientList':
      case '/sys/clientManagement/clientHandle/editClient':
        result = '/sys/clientManagement/clientHandle/clientList';
        subMenu = ['/sys/clientManagement/clientHandle', '/sys/clientManagement'];
        break;
      case '/sys/clientManagement/billHandle/reconciliation':
        result = '/sys/clientManagement/billHandle/reconciliation';
        subMenu = ['/sys/clientManagement/billHandle', '/sys/clientManagement'];
        break;
      case '/sys/clientManagement/billHandle/optionalBill':
        result = '/sys/clientManagement/billHandle/optionalBill';
        subMenu = ['/sys/clientManagement/billHandle', '/sys/clientManagement'];
        break;
      case '/sys/billingManagement/billingRoleHandle':
        result = '/sys/billingManagement/billingRoleHandle';
        subMenu = ['/sys/billingManagement'];
        break;
      case '/sys/billingManagement/billingInfoHandle':
        result = '/sys/billingManagement/billingInfoHandle';
        subMenu = ['/sys/billingManagement'];
        break;
      case '/sys/apportionManagement/apportionInfoHandle':
        result = '/sys/apportionManagement/apportionInfoHandle';
        subMenu = ['/sys/apportionManagement'];
        break;
      case '/sys/documentManagement/documentHandle':
        result = '/sys/documentManagement/documentHandlee';
        subMenu = ['/sys/documentManagement'];
        break;
      case '/sys/information/add':
        result = '/sys/information/add';
        subMenu = ['/sys/information'];
        break;
      case '/sys/information/list':
        result = '/sys/information/list';
        subMenu = ['/sys/information'];
        break;
      default:
        result = '/sys/';
    }

    return [result, subMenu];
  }

  async getNavList() {
    const res = await Fetch('/api/nav/get');
    const { nav } = await res.json();

    const navList = nav.filter(n => !n.belong);
    const middleNavList = nav.filter(n => n.belong && !n.rootNode);
    const rootNavList = nav.filter(n => n.rootNode);

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
        <SubMenu key={systemItem.route} title={<span><Icon type={systemItem.icon} /><span>{systemItem.name}</span></span>}>
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
      return (<Menu.Item key={systemItem.route}><Link to={systemItem.route}><Icon type={systemItem.icon} /><span>{systemItem.name}</span></Link></Menu.Item>);
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
        inlineCollapsed={this.props.collapsed}
      >
        {this.state.nav.map(n => this.navHandle(n))}
      </Menu>
    );
  }
}