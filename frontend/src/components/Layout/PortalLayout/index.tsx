import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const Header = React.lazy(() => import("../Header"));

export const PortalLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <Layout style={{ height: "100%" }} hasSider>
      <Layout>
        <Header />
        <Layout.Content>{children ? children : <Outlet />}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default React.memo(PortalLayout);
