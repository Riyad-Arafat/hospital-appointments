import { Button } from "antd";
import useDispatch from "hooks/useDispatch";
import React from "react";
import { ActionTypes } from "types/Atcions.typs";

interface Props {
  id: string | number;
  reFetch?: () => void;
}

const DeleteAppointment = ({ id, reFetch }: Props) => {
  const { dispatch } = useDispatch();

  const handleDelete = async () => {
    await dispatch({
      type: ActionTypes.DELETE_APPOINTMENT,
      payload: {
        appointmenId: id,
      },
    }).then(() => {
      reFetch?.();
    });
  };

  return (
    <Button type="primary" danger onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteAppointment;
