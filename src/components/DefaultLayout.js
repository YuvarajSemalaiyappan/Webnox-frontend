

import {

  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,

  UnorderedListOutlined,

} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const {  loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggle = () => {
    setCollapsed(!collapsed);
  };



  return (
    <Layout>
      {loading && <Spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"><img src="https://webnox.in/wp-content/uploads/2019/07/website-design-and-SEO-company-coimbatore-Webnox-Technologies.png" alt="Logo" style={{width:"150px", height:"30px"}}/></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
        >
        
          <Menu.Item
            key="/"
            icon={<UnorderedListOutlined />}
            onClick={() => navigate("/")}
          >
            Items
          </Menu.Item>
          
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            margin: 8,
            padding: 0,
            borderRadius: 8,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          
        </Header>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
