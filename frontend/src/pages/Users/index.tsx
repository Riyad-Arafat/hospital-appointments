import React, { useEffect } from "react";
import useDispatch from "hooks/useDispatch";
import { ActionTypes } from "types/Atcions.typs";
import UsersList from "components/UserComponets/UsersList";
import UserForm from "components/UserComponets/UserForm";
import { AllUsersResponse } from "types/User.type";

const UsersPage = () => {
  const { dispatch, data } = useDispatch<AllUsersResponse>();
  const getAllUsers = async () => {
    dispatch({
      type: ActionTypes.GET_ALL_USERS,
      payload: {
        query: {
          role: "doctor",
        },
      },
    });
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <UserForm reFetch={getAllUsers} />
      <br />
      <UsersList data={data} reFetch={getAllUsers} />
    </div>
  );
};

export default UsersPage;
