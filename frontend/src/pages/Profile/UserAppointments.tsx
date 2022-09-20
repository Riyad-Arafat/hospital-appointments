import { Row, Card, Col, Typography, List } from "antd";
import { LoadingSpin } from "components/LoadingSpin";
import useAuth from "hooks/useAuth";
import useDispatch from "hooks/useDispatch";
import moment from "moment";
import AppointmentForm from "pages/Home/AppointmentForm";
import DeleteAppointment from "pages/Home/DeleteAppointment";
import React, { useEffect } from "react";
import { AppointmenType, GetAppointmentsResponse } from "types/Appoinment.type";
import { ActionTypes } from "types/Atcions.typs";

const UserAppointments = () => {
  const { dispatch, data } = useDispatch<GetAppointmentsResponse>();
  const getAppointments = async () => {
    return dispatch({
      type: ActionTypes.GET_CURRENT_USER_APPPOINTMENTS,
    });
  };

  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Title level={2}>My Appoinments</Typography.Title>
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
            renderItem={(item) => (
              <ListItem data={item} reFetch={getAppointments} />
            )}
            style={{ paddingBlock: "1rem" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

const ListItem = React.memo(
  ({ data, reFetch }: { data: AppointmenType; reFetch?: () => void }) => {
    const { user } = useAuth();
    return (
      <List.Item
        actions={
          user?.role !== "doctor" && data.client.id === user?.id
            ? [
                <AppointmentForm data={data} reFetch={reFetch} />,
                <DeleteAppointment id={data.id} reFetch={reFetch} />,
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
          <h1>Appointment: {data.name}</h1>
          <h3>Speciality: {data.speciality.name}</h3>
          <p>description: {data.description}</p>
          <b>date: {moment(data.date).format("YYYY/MM/DD hA")}</b>

          {user?.role === "doctor" && (
            <b>
              client: {`${data.client.first_name} ${data.client.last_name}`}
            </b>
          )}
        </div>
      </List.Item>
    );
  }
);

export default UserAppointments;
