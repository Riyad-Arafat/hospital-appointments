import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography, Grid, Layout } from "antd";
const { useBreakpoint } = Grid;

const Header: React.FC = memo(() => {
  const { xs } = useBreakpoint();

  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          maxWidth: "100%",
          // width: !md ? "100%" : "300px",
        }}
      >
        <Link to="/portal/profile">
          <div>
            <Avatar shape="circle" alt="user Picture" size="large">
              "R"
            </Avatar>
            {!xs ? (
              <div>
                <Typography.Text>{`first name last name`}</Typography.Text>
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    </Layout.Header>
  );
});

export default Header;
