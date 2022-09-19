import { Row, Card, Col, Typography, List } from "antd";
import { LoadingSpin } from "components/LoadingSpin";
import useDispatch from "hooks/useDispatch";
import AppointmentForm from "pages/Home/AppointmentForm";
import React, { useEffect } from "react";
import { AppointmenType, GetAppointmentsResponse } from "types/Appoinment.type";
import { ActionTypes } from "types/Atcions.typs";

const UserAppointments = () => {
  const { dispatch, data } = useDispatch<GetAppointmentsResponse>();
  const getAppointments = async () => {
    dispatch({
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
            dataSource={!!data ? data : []}
            size="large"
            renderItem={(item) => <ListItem data={item} />}
            style={{ paddingBlock: "1rem" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

const ListItem = React.memo(({ data }: { data: AppointmenType }) => {
  console.log("render");
  console.log(data);
  return (
    <List.Item
      actions={[<AppointmentForm id="ss" />]}
      style={{ borderBottom: "1px solid #e8e8e8" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <h1>Appointment: {data.title}</h1>
        <h3>Doctor: {data.doctor_id}</h3>
        <p>description: {data.description}</p>
        <b>date: {data.date}</b>
      </div>
    </List.Item>
  );
});

export default UserAppointments;
