import {
  AuditOutlined,
  PieChartOutlined,
  ProductOutlined,
  TeamOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const dashboard_items: MenuItem[] = [
  getItem(<Link href={'/dashboard'}>Dashboard</Link>, "1", <PieChartOutlined />),
  getItem(<Link href={'/dashboard/product-management'}>Product Management</Link>, "2", <ProductOutlined />),
  getItem(<Link href={'/dashboard/user-management'}>User Management</Link>, "3", <UserOutlined />),
  getItem(<Link href={'/dashboard/order-management'}>Order Management</Link>, "4", <AuditOutlined />),
  getItem(<Link href={'/dashboard/role-management'}>Role Management</Link>, "5", <UsergroupDeleteOutlined />),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
];
