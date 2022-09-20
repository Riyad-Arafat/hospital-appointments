import React, { useEffect, useMemo, useState } from "react";
import { Alert, Button, Col, Form, Input, Modal, Space } from "antd";
import useDispatch from "hooks/useDispatch";
import { ActionTypes } from "types/Atcions.typs";
import { UserType } from "types/User.type";
import { Select } from "antd";
import { GetAllSpecialitiesResponse } from "types/Speciality.types";
import { addAmPm } from "utils/utils";

const { Option } = Select;

export const UserForm = ({
  data,
  reFetch,
}: {
  data?: UserType;
  reFetch?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    setTimeout(() => {
      reFetch?.();
    }, 0);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {!!data?.id ? "Edit" : "Add"} User
      </Button>
      <Modal
        title="User"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <UserFormComponet
          initialValues={data}
          onCancel={handleCancel}
          onSuccess={handleOk}
        />
      </Modal>
    </>
  );
};

const UserFormComponet = ({
  initialValues,
  onSuccess,
  onCancel,
}: {
  initialValues?: UserType;
  onSuccess?: () => void;
  onCancel?: () => void;
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { dispatch: sDispathch, data: specialries } =
    useDispatch<GetAllSpecialitiesResponse>();
  const { dispatch, error } = useDispatch();

  const createFun = async (values: any) => {
    await dispatch({
      type: ActionTypes.CREATE_USER,
      payload: { ...values, role: "doctor" },
    });
  };

  const updateFun = async (values: any) => {
    !!initialValues?.id &&
      (await dispatch({
        type: ActionTypes.UPDATE_USER,
        payload: { user_id: initialValues.id, data: values },
      }));
  };

  const handleOk = async (values: any) => {
    setConfirmLoading(true);
    try {
      if (!!initialValues?.id) {
        await updateFun(values);
      } else {
        await createFun(values);
      }
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      console.log({ error });
    } finally {
      setConfirmLoading(false);
    }
  };

  useEffect(() => {
    sDispathch({
      type: ActionTypes.GET_ALL_SPECIALTIES,
      payload: {},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Options = useMemo(() => {
    return specialries?.data.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  }, [specialries]);

  return (
    <>
      {error && <Alert message={error?.message} type="error" />}
      <br />
      <Form<UserType>
        form={form}
        layout="vertical"
        initialValues={{
          ...initialValues,
          speciality_id: initialValues?.speciality?.id,
        }}
        onFinish={handleOk}
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
          <Input placeholder="First Name" />
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
          <Input placeholder="Last Name" />
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
          <Input placeholder="Email" />
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
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="speciality_id"
          rules={[
            {
              required: true,
              type: "number",
              message: "Select Speciality",
            },
          ]}
        >
          <Select placeholder="Select Speciality">{Options}</Select>
        </Form.Item>

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
          <Select size="large" style={{ width: 200 }}>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <Select.Option key={i} value={12 + i}>
                  {addAmPm(12 + i)}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Col
          xs={24}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Space>
            <Button
              onClick={onCancel}
              type="text"
              danger
              disabled={confirmLoading}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              Save
            </Button>
          </Space>
        </Col>
      </Form>
    </>
  );
};

export default UserForm;
