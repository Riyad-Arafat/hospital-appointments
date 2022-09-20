import React from "react";

import { Row, Card, Col, Typography, List } from "antd";
import { LoadingSpin } from "components/LoadingSpin";
import { AllUsersResponse, UserType } from "types/User.type";
import DeleteUser from "./DeleteUser";
import UserForm from "./UserForm";
import useAuth from "hooks/useAuth";
import { useLocation } from "react-router-dom";
import { addAmPm } from "utils/utils";

const UsersList = React.memo(
  ({
    data,
    reFetch,
  }: {
    data: AllUsersResponse | null;
    reFetch?: () => void;
  }) => {
    return (
      <Card>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title level={2}>Doctors</Typography.Title>
          </Col>
          <Col span={24}>
            <List
              itemLayout="horizontal"
              loading={{
                spinning: !data,
                indicator: <LoadingSpin />,
              }}
              dataSource={!!data ? data.data : []}
              size="large"
              renderItem={(item) => <ListItem data={item} reFetch={reFetch} />}
              style={{ paddingBlock: "1rem" }}
            />
          </Col>
        </Row>
      </Card>
    );
  }
);

const ListItem = React.memo(
  ({ data, reFetch }: { data: UserType; reFetch?: () => void }) => {
    const location = useLocation();

    const { user } = useAuth();
    // check if user is super admin and path is /users
    let isSuperAdmin =
      user?.role === "super_admin" && location.pathname === "/users";
    return (
      <List.Item
        actions={
          isSuperAdmin
            ? [
                <UserForm data={data} reFetch={reFetch} />,
                <DeleteUser id={data.id} reFetch={reFetch} />,
              ]
            : []
        }
        style={{ borderBottom: "1px solid #e8e8e8" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h1>
            Name: {data.first_name} {data.last_name}
          </h1>
          <b>Arrival Time: {addAmPm(data.arraival_time || 0)}</b>
          <b>Speciality: {data.speciality?.name || "None"}</b>
        </div>
      </List.Item>
    );
  }
);

export default UsersList;
