// Hooks
import { useState, useEffect } from "react";

import { Button, Col, Form, Input, Select, Space } from "antd";
import { EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { UpdateUserRequest, UpdateUserResponse } from "types/User.type";
import useDispatch from "hooks/useDispatch";
import { ActionTypes } from "types/Atcions.typs";
import useAuth from "hooks/useAuth";
import { addAmPm } from "utils/utils";

const { useForm } = Form;

const UpdateProfileForm = () => {
  const { user: profile, reAuth } = useAuth();
  const [isEditable, setIsEditable] = useState(false);
  const { dispatch } = useDispatch<UpdateUserResponse>();
  const [form] = useForm();
  const { search } = useLocation();

  useEffect(() => {
    const editable = new URLSearchParams(search).get("edit");
    if (editable) setIsEditable(true);
  }, [search]);

  const handelSubmit = async (values: UpdateUserRequest) => {
    dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: { user_id: profile?.id || "", data: values },
    }).then(() => {
      setIsEditable(false);
      reAuth();
    });
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          first_name: profile?.first_name,
          last_name: profile?.last_name,
          email: profile?.email,
          arraival_time: profile?.arraival_time || 0,
        }}
        onFinish={handelSubmit}
      >
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
          <Input
            disabled={!isEditable}
            prefix={<UserOutlined />}
            placeholder="First Name"
          />
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
          <Input
            disabled={!isEditable}
            prefix={<UserOutlined />}
            placeholder="Last Name"
          />
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
          <Input
            disabled={!isEditable}
            prefix={<MailOutlined />}
            placeholder="Email"
          />
        </Form.Item>
        {profile?.role === "doctor" && (
          <Form.Item
            name="arraival_time"
            label="arrival time"
            rules={[
              {
                required: true,
                message: "Please input your arrival time!",
              },
            ]}
          >
            <Select size="large" style={{ width: 200 }} disabled={!isEditable}>
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <Select.Option key={i} value={12 + i}>
                    {addAmPm(12 + i)}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        )}

        <Col
          xs={24}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {isEditable ? (
            <Space>
              <Button onClick={toggleEdit} type="text" danger>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          ) : (
            <Button icon={<EditOutlined />} onClick={toggleEdit}>
              Edit
            </Button>
          )}
        </Col>
      </Form>
    </>
  );
};

export default UpdateProfileForm;
