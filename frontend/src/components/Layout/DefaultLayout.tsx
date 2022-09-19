// Components
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export const DefaultLayout: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default DefaultLayout;
