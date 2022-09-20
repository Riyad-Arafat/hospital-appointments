import React from "react";

import { Row, Card, Col, Typography, List } from "antd";
import { LoadingSpin } from "components/LoadingSpin";
import {
  GetAllSpecialitiesResponse,
  SpecialityType,
} from "types/Speciality.types";
import SpecialityForm from "./SpecialityForm";
import DeleteSpeciality from "./DeleteSpeciality";

const SpecialitiesList = React.memo(
  ({
    data,
    reFetch,
  }: {
    data: GetAllSpecialitiesResponse | null;
    reFetch: () => void;
  }) => {
    return (
      <Card>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title level={2}>Specialities</Typography.Title>
          </Col>
          <Col span={24}>
            <List
              itemLayout="horizontal"
              loading={{
                spinning: !data?.data,
                indicator: <LoadingSpin />,
              }}
              dataSource={!!data?.data ? data?.data : []}
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
  ({ data, reFetch }: { data: SpecialityType; reFetch?: () => void }) => {
    return (
      <List.Item
        actions={[
          <SpecialityForm data={data} reFetch={reFetch} />,
          <DeleteSpeciality id={data.id} reFetch={reFetch} />,
        ]}
        style={{ borderBottom: "1px solid #e8e8e8" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h1>Name: {data.name}</h1>
          <p>description: {data.description}</p>
        </div>
      </List.Item>
    );
  }
);

export default SpecialitiesList;
