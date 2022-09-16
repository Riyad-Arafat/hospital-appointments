// Components
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

export const DefaultLayout: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </Layout>
  );
};

export default DefaultLayout;
