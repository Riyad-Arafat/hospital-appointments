import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Form, Input, Button, Alert } from "antd";
import useAuth from "hooks/useAuth";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = useCallback(async (values: any) => {
    setLoading(true);
    await login(values)
      .then(() => navigate("/"))

      .catch((e: Error) => setError(e.message))
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row
      style={{
        justifyContent: "center",
        paddingTop: 50,
      }}
    >
      <Col xs={24} sm={12}>
        <Card bordered title="Login">
          {!!error && (
            <>
              <Alert type="error" message={error} />
              <br />
            </>
          )}

          <Form onFinish={onSubmit}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter Valid E-mail",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  type: "string",
                  message: "Enter Valid Password",
                },
                {
                  min: 8,
                  message: "Passord must be at least 8 digits long",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Button htmlType="submit" block type="primary" loading={loading}>
              Login
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
