import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  Space,
  Select,
  Alert,
} from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import { FormProps } from "types/Common.type";
import { AppointmentRequest, AppointmenType } from "types/Appoinment.type";
import useDispatch from "hooks/useDispatch";
import { GetAllSpecialitiesResponse } from "types/Speciality.types";
import { ActionTypes } from "types/Atcions.typs";
import useAuth from "hooks/useAuth";

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before current day
  let past = moment().subtract(1, "minute");
  return current && current < past;
};
// function to get range between two numbers
const range = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const AppointmentForm = ({
  data,
  reFetch,
}: {
  data?: AppointmenType;
  reFetch?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onSucces = () => {
    setOpen(false);
    reFetch?.();
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {!!data ? "Edit" : "Add"} Appointment
      </Button>
      <Modal
        title="Title"
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <CreateAppointment
          onCancel={handleCancel}
          onSuccess={onSucces}
          initialValues={data}
        />
      </Modal>
    </>
  );
};

const CreateAppointment = ({
  onCancel,
  onSuccess,
  initialValues,
}: FormProps<AppointmenType>) => {
  const { user } = useAuth();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { dispatch: sDispathch, data: specialries } =
    useDispatch<GetAllSpecialitiesResponse>();
  const { dispatch, error } = useDispatch();
  const [form] = Form.useForm();

  const submit = async (values: any) => {
    let date = values.date as moment.Moment;
    date.seconds(0);
    date.minutes(0);
    if (!!user?.id) {
      setConfirmLoading(true);
      let data: AppointmentRequest = {
        name: values.name,
        description: values.description,
        date: date.format("YYYY-MM-DD HH:mm:ss"),
        client_id: user?.id,
        speciality_id: values.speciality_id,
      };
      if (!!initialValues?.id) await updateFun(data);
      else await createFun(data);
    }
  };

  const updateFun = async (values: AppointmentRequest) => {
    if (!!user?.id && !!initialValues?.id) {
      await dispatch({
        type: ActionTypes.UPDATE_APPOINTMENT,
        payload: { appointmentId: initialValues.id, data: values },
      })
        .then(() => {
          onSuccess?.();
          form.resetFields();
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    }
  };

  const createFun = async (values: AppointmentRequest) => {
    if (!!user?.id) {
      await dispatch({
        type: ActionTypes.CREATE_APPOINTMENT,
        payload: { data: values },
      })
        .then(() => {
          onSuccess?.();
          form.resetFields();
        })
        .finally(() => {
          setConfirmLoading(false);
        });
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
      <Select.Option key={item.id} value={item.id}>
        {item.name}
      </Select.Option>
    ));
  }, [specialries]);

  return (
    <>
      {!!error && <Alert message={error?.message} type="error" />}
      <br />

      <Form<AppointmentRequest>
        form={form}
        layout="vertical"
        onFinish={submit}
        initialValues={{
          ...initialValues,

          date: moment(initialValues?.date),
          speciality_id: initialValues?.speciality.id,
        }}
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
        <Space align="end">
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
            <DatePicker
              showTime
              disabledDate={disabledDate}
              showNow={false}
              use12Hours
              disabledTime={(current) => {
                let past = moment().subtract(1, "minute");
                return {
                  disabledHours: () => {
                    return [...range(12, past.hour()), ...range(0, 12), 22, 23];
                  },
                  disabledMinutes: () => {
                    return range(1, 60);
                  },
                  disabledSeconds: () => {
                    return range(1, 60);
                  },
                };
              }}
              format="YYYY-MM-DD h A"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="speciality_id"
            label="Speciality"
            rules={[
              {
                required: true,
                type: "number",
                message: "Select Speciality",
              },
            ]}
          >
            <Select size="large" placeholder="Select Speciality">
              {Options}
            </Select>
          </Form.Item>
        </Space>

        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            Submit
          </Button>
          <Button
            htmlType="button"
            onClick={onCancel}
            disabled={confirmLoading}
          >
            Cancel
          </Button>
        </Space>
      </Form>
    </>
  );
};

export default AppointmentForm;
