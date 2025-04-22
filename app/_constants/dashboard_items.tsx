import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ProductOutlined,
  TeamOutlined,
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
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
