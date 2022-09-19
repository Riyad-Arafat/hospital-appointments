import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  DatePicker,
  Select,
  Space,
} from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
const { Option } = Select;

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
};

export const AppointmentForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        let date: moment.Moment = values["date"];
        let d = date.toDate();
        d.setHours(values["time"], 0, 0);
        values["date"] = d;
        console.log({ values });

        // form.resetFields();
        // setOpen(false);
        console.log("Received values of form: ", values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });

    setTimeout(() => {
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Book
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <CreateAppointment form={form} />
      </Modal>
    </>
  );
};

const CreateAppointment = ({ form }: { form: FormInstance }) => {
  const [timeOptions, settimeOptions] = useState<React.ReactNode[]>();

  const setOptii = () => {
    const options: React.ReactNode[] = [];
    for (let i = 0; i <= 9; i++) {
      options.push(
        <Option key={`${i + 12}`}>{`${i === 0 ? 12 : i}pm`}</Option>
      );
    }
    settimeOptions(options);
  };

  useEffect(() => {
    setOptii();
  }, []);

  return (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item
        name="title"
        label="Title"
        rules={[
          { required: true, message: "Please input the title of Appointment!" },
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
        <Form.Item
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please input the Day of Appointment!",
            },
          ]}
        >
          <DatePicker disabledDate={disabledDate} size="large" />
        </Form.Item>

        <Form.Item
          name="time"
          label="time"
          rules={[
            {
              required: true,
              message: "Please input the time of Appointment!",
            },
          ]}
        >
          <Select size="large" style={{ width: 200 }}>
            {timeOptions}
          </Select>
        </Form.Item>
      </Space>

      {/*  */}
    </Form>
  );
};

export default AppointmentForm;
