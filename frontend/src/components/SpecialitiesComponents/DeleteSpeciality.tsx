import { Button } from "antd";
import useDispatch from "hooks/useDispatch";
import React from "react";
import { ActionTypes } from "types/Atcions.typs";

interface Props {
  id: string;
  reFetch?: () => void;
}

const DeleteSpeciality = ({ id, reFetch }: Props) => {
  const { dispatch } = useDispatch();

  const handleDelete = async () => {
    await dispatch({
      type: ActionTypes.DELETE_SPECIALTY,
      payload: {
        specialityId: id,
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

export default DeleteSpeciality;
