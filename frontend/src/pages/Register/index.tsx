import { useCallback, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Form, Input, Button, Alert } from "antd";
import { registerAPI } from "api/Auth";
import { useNavigate } from "react-router-dom";
import { RegisterProps } from "types/Auth.type";
import { AxiosError } from "axios";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = useCallback(async (values: RegisterProps) => {
    setLoading(true);
    await registerAPI(values)
      .then(() => navigate("/login"))
      .catch((e: AxiosError<any>) => {
        setError(e.response?.data.message || "Something went wrong");
      })
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
              name="first_name"
              rules={[
                {
                  required: true,
                  type: "string",
                  message: "Enter your First name",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>

            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                  type: "string",
                  message: "Enter your Last name",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Form.Item>
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
              Register
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;
