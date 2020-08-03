/**
 * node_modules package
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

/**
 * components import
 */
import Head from '../../../components/Head';
import Nav from '../../../components/Nav';

/**
 * resources import
 */
import styles from './style.css';

// router
import userManagement from '../userManagement'
import dashboard from '../dashboard'
import welcome from '../welcome/index.tsx'


const {
    Sider,
    Content,
} = Layout;


// @withRouter
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className={styles.logoBox}>
                        <div className={styles.logo}></div>
                    </div>
                    <Nav collapsed={this.state.collapsed} />
                </Sider>
                <Layout>
                    <Head style={{ background: '#fff', padding: 0 }} collapsed={this.state.collapsed} toggle={this.toggle} />
                    <Content>
                        <Switch>
                            <Route exact path='/sys/' render={() => <div />} />
                            <Route path='/sys/welcome' component={welcome} />
                            <Route path='/sys/user' component={userManagement} />
                            <Route path='/sys/dashboard' component={dashboard} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}