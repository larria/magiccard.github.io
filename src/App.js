import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';

import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import { createHashHistory } from 'history';

// import getData from './getData'
// import getURL from './getURL'

import PannelMuseum from './components/PannelMuseum'
import ThemeCards from './components/ThemeCards'
import PageRegister from './components/PageRegister'
import PanelHome from './components/PanelHome'
import PanelSettings from './components/PanelSettings'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
    state = {
        collapsed: true,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    componentDidMount() {
        // console.log(history.location.pathname)
    }

    render() {
        // 如果没有本地数据，先初始化
        // let loc = local.getLocObj()
        // if (!loc) {
        //     local.initLoc()
        // }
        // let userName = local.getLocUserName()
        // let avatar = local.getLocAvatar()
        // 如果没有用户信息，先前往注册
        if (this.props.userName === null || this.props.avatar === null) {
            let history = createHashHistory()
            // museum可无需用户信息访问
            if (!history.location.pathname.includes('/museum')) {
                history.replace('/register')
            }
        }
        return (
            <Router>
                <Switch>
                    <Route exact path="/register">
                        <PageRegister />
                    </Route>
                    <Route path="/">
                        <Layout style={{ minHeight: '100vh' }}>
                            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                                <div className="logo_main">
                                    <img src="logo_small.jpeg" alt="" />
                                </div>
                                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                    <Menu.Item key="1" icon={<DesktopOutlined />}>
                                        <Link to="/home">我的</Link>
                                    </Menu.Item>
                                    <SubMenu key="sub1" icon={<UserOutlined />} title="好友">
                                        <Menu.Item key="3">心月</Menu.Item>
                                        <Menu.Item key="4">泠泠弦上</Menu.Item>
                                        <Menu.Item key="5">Lynn</Menu.Item>
                                        <Menu.Item key="6">蜂蜜小黄鱼</Menu.Item>
                                        <Menu.Item key="7">落雪无痕</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<TeamOutlined />} title="卡友">
                                        <Menu.Item key={Math.random()}>3646785456</Menu.Item>
                                        <Menu.Item key={Math.random()}>3646785450</Menu.Item>
                                        <Menu.Item key={Math.random()}>3646785450</Menu.Item>
                                        <Menu.Item key={Math.random()}>3646785450</Menu.Item>
                                        <Menu.Item key={Math.random()}>3646785450</Menu.Item>
                                        <Menu.Item key={Math.random()}>3646785450</Menu.Item>
                                        <Menu.Item key={Math.random()}>3646785450</Menu.Item>
                                        <Menu.Item key={Math.random()}>3646785450</Menu.Item>
                                    </SubMenu>
                                    <Menu.Item key="9" icon={<FileOutlined />}>
                                        <Link to="/museum">博物馆</Link>
                                    </Menu.Item>
                                    <Menu.Item key="10" icon={<SettingOutlined />}>
                                        <Link to="/settings">设置</Link>
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Layout className="site-layout">
                                <Switch>
                                    <Route path="/home">
                                        <Header className="site-layout-background" style={{ padding: 0 }}>
                                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                                                <Menu.Item key="1">
                                                    <Link to="/home/book">集卡册</Link>
                                                </Menu.Item>
                                                <Menu.Item key="2">
                                                    <Link to="/home/">卡片合成</Link>
                                                </Menu.Item>
                                                <Menu.Item key="3">
                                                    <Link to="/home/change">变卡</Link>
                                                </Menu.Item>
                                                <Menu.Item key="4">
                                                    <Link to="/home/bonus">道具</Link>
                                                </Menu.Item>
                                                <Menu.Item key="5">
                                                    <Link to="/home/user">个人信息</Link>
                                                </Menu.Item>
                                            </Menu>
                                        </Header>
                                    </Route>
                                    <Route path="/museum">
                                    </Route>
                                </Switch>
                                <Content style={{ margin: '0 16px' }}>
                                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                        <Switch>
                                            <Route exact path="/museum">
                                                <PannelMuseum />
                                            </Route>
                                            <Route path="/theme_card/:theme_id" component={_getThemeCards}>
                                            </Route>
                                            <Route exact path="/">
                                                <Redirect to="/home" />
                                            </Route>
                                            <Route exact path="/home">
                                                <PanelHome />
                                            </Route>
                                            <Route exact path="/settings">
                                                <PanelSettings></PanelSettings>
                                            </Route>
                                        </Switch>
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Created by Larkin, 2020</Footer>
                            </Layout>
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

function _getThemeCards({ match }) {
    return (
        <ThemeCards theme_id={match.params.theme_id}></ThemeCards>
    )
}

App.defaultProps = {
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName,
        avatar: state.avatar
    }
}

export default connect(mapStateToProps, null)(App);