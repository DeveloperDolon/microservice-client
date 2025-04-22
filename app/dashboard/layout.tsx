"use client";
import { UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Avatar, Badge, Breadcrumb, Layout, Menu, Space, theme } from "antd";
import { dashboard_items } from "../_constants/dashboard_items";
import { usePathname } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const path = usePathname();
  const pathArray = path.split("/");

  const breadcrumbItems = pathArray.map((item) => {
    return {
      href: "/" + pathArray.slice(1, pathArray.indexOf(item) + 1).join("/"),
      breadcrumbName: (item.charAt(0).toUpperCase() + item.slice(1))
        .split("-")
        .join(" "),
    };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical text-white md:text-xl sm:text-lg text-base font-semibold text-center py-4">
          This is the logo
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={dashboard_items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0px 50px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        > 
          <div></div>
          <Space size={24}>
            <Badge count={1}>
              <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
          </Space>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb routes={breadcrumbItems} style={{ margin: "16px 0" }} />
          
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ECommerce Dashboard ©{new Date().getFullYear()} Created by
          DeveloperDolon
        </Footer>
      </Layout>
    </Layout>
  );
}
