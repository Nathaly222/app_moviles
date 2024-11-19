import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    GlobalOutlined,
    VideoCameraOutlined, BankOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import styles from './root-layout.module.css'
import {Space} from "antd/lib";
import {NavLink, Outlet} from "react-router-dom";
const { Header, Sider, Content } = Layout;



 const RootLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className={styles.container}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.logo} />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <BankOutlined />,
                            label:(<NavLink to="/">Home</NavLink>),
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: (<NavLink to="/character">Character</NavLink>),
                        },
                        {
                            key: '3',
                            icon: <GlobalOutlined />,
                            label: (<NavLink to="/localizations">Localizations</NavLink>),
                        },
                        {
                            key: '4',
                            icon: <VideoCameraOutlined />,
                            label: (<NavLink to="/episodes">Episodes</NavLink>),
                        },
                    ]}
                />
            </Sider>
            <Layout className={styles.siteLayout}>
                <Header style={{ padding: 0, background: colorBgContainer }}>

                    <Space>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: styles.trigger,
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <h1 className={styles.title} >RICK AND MORTY</h1>
                    </Space>
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
<Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default RootLayout
