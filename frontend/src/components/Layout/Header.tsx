import React, { memo } from "react";
import { Layout, Button, Space } from "antd";
import useAuth from "hooks/useAuth";
import { NavMenu } from "./NavMenu";
import { Link } from "react-router-dom";

const Header: React.FC = memo(() => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <Layout.Header
      style={{
        display: "flex",
      }}
    >
      <NavMenu
        style={{
          flex: 1,
        }}
      />
      {!isAuthenticated ? (
        <Space
          style={{
            flex: 0,
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary">
            <Link to="/login">Login</Link>
          </Button>
          <Button type="dashed">
            <Link to="/register">Register</Link>
          </Button>
        </Space>
      ) : (
        <Space>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </Space>
      )}
    </Layout.Header>
  );
});

export default Header;
