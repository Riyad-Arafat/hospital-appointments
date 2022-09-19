import React, { useState } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import useDispatch from "hooks/useDispatch";
import { ActionTypes } from "types/Atcions.typs";
import { SpecialityType } from "types/Speciality.types";

export const SpecialityForm = ({
  data,
  reFetch,
}: {
  data?: SpecialityType;
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
        {!!data?.id ? "Edit" : "Add"} Speciality
      </Button>
      <Modal
        title="Speciality"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <CreateAppointment
          initialValues={data}
          onCancel={handleCancel}
          onSuccess={handleOk}
        />
      </Modal>
    </>
  );
};

const CreateAppointment = ({
  initialValues,
  onSuccess,
  onCancel,
}: {
  initialValues?: SpecialityType;
  onSuccess?: () => void;
  onCancel?: () => void;
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { dispatch } = useDispatch();
  const createFun = async (values: any) => {
    await dispatch({
      type: ActionTypes.CREATE_SPECIALTY,
      payload: values,
    });
  };

  const updateFun = async (values: any) => {
    !!initialValues?.id &&
      (await dispatch({
        type: ActionTypes.UPDATE_SPECIALTY,
        payload: { specialityId: initialValues?.id, data: values },
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
      console.log(error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: initialValues?.name,
        description: initialValues?.description,
      }}
      onFinish={handleOk}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input the Name of Appointment!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please input the description of Appointment!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" loading={confirmLoading}>
          Submit
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Space>
    </Form>
  );
};

export default SpecialityForm;
