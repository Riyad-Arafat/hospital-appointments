import { Menu, MenuProps } from "antd";

import { Link, useLocation } from "react-router-dom";

import {
  ControlOutlined,
  UserOutlined,
  HomeOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const Lable = ({
  label,
  path,
  text,
  ...props
}: {
  label: string;
  path?: string;
  text?: boolean;
}) => {
  if (text) return <span {...props}>{label}</span>;
  else if (path) return <Link to={path}>{label}</Link>;
  return null;
};

type ItemProps = ItemType & {
  authed?: boolean;
};

type NavMenuProps = ItemProps[];
const defaultItems: NavMenuProps = [
  {
    label: <Lable label="Home" path="/" />,
    key: "/",
    icon: <HomeOutlined />,
    authed: true,
  },
  {
    label: <Lable label="Profile" path="/profile" />,
    key: "/profile",
    icon: <UserOutlined />,
    authed: true,
  },
];

const superAdminItems: NavMenuProps = [
  {
    label: <Lable label="Specialities" path="/specialities" />,
    key: "/specialities",
    icon: <ControlOutlined />,
  },
  {
    label: <Lable label="Users" path="/users" />,
    key: "/users",
    icon: <GroupOutlined />,
  },
];

export const NavMenu = ({ style }: { style?: React.CSSProperties }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  let [items, setItems] = useState<MenuProps["items"]>([]);
  const handelSelectedKeys = (): string[] | undefined => {
    let pathName = location.pathname;
    let keys: string[] = [pathName];
    if (pathName === "/portal/service-providers") keys.push("/portal/benefits");
    return keys;
  };

  const initialItems = useCallback(() => {
    let menu: MenuProps["items"] = [];
    let items = [
      ...defaultItems.filter((item) => {
        if (typeof item.authed === "undefined") return true;
        if (!isAuthenticated && item.authed) return false;
        return true;
      }),
    ];
    if (user?.role === "super_admin") menu = [...items, ...superAdminItems];
    else menu = [...items];
    setItems(menu);
  }, [isAuthenticated, user?.role]);

  useEffect(() => {
    initialItems();
  }, [initialItems]);

  return (
    <Menu
      activeKey={location.pathname}
      selectedKeys={handelSelectedKeys()}
      mode="horizontal"
      theme="dark"
      items={items}
      style={style}
    />
  );
};
