import React, { memo } from "react";
import styled from "styled-components";
import { Typography, Space, Avatar } from "antd";

interface Props {
  name: string;
  role?: string;
}

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Title = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 0;
  }
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 15px;
  margin-bottom: 15px;
`;

export const UserProfile: React.FC<Props> = memo(({ name, role }) => (
  <Flex>
    <StyledAvatar size={100}>N</StyledAvatar>
    <Space direction="vertical" style={{ marginBottom: "var(--space-md)" }}>
      <Title level={4}>{name}</Title>
      <Typography.Text type="secondary">{role}</Typography.Text>
    </Space>
  </Flex>
));

export default UserProfile;
