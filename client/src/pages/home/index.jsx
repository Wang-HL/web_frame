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
import style from './style.css';


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
                    <div className={style.logo} />
                    <Nav collapsed={this.state.collapsed} />
                </Sider>
                <Layout>
                    <Head style={{ background: '#fff', padding: 0 }} collapsed={this.state.collapsed} toggle={this.toggle} />
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <Route exact path='/sys/' render={() => <div />} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}