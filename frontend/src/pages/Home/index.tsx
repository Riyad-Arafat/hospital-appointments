import React, { useCallback, useEffect } from "react";
import { Space } from "antd";
import UsersList from "components/UserComponets/UsersList";
import useAuth from "hooks/useAuth";
import { useDispatch } from "hooks/useDispatch";
import { ActionTypes } from "types/Atcions.typs";
import { QueryProps } from "types/Common.type";
import { AllUsersResponse } from "types/User.type";
import AppointmentForm from "components/ApointmentComponents/AppointmentForm";
import Filter from "components/Filter";

const HomePage = () => {
  const { user } = useAuth();
  const [query, setQuery] = React.useState<QueryProps>();
  const changeQuery = (value: number) => {
    console.log(value);
    setQuery((prev) => ({ ...prev, speciality_id: value }));
  };

  const { dispatch, data } = useDispatch<AllUsersResponse>();

  const getAllUsers = useCallback(async () => {
    dispatch({
      type: ActionTypes.GET_ALL_USERS,
      payload: {
        query: {
          role: "doctor",
          speciality_id: query?.speciality_id,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <>
      <Space
        style={{
          width: "100%",
          padding: "10px",
          justifyContent: "center",
        }}
        size="large"
      >
        <Filter onSearch={changeQuery} />
        {user?.role !== "doctor" ? (
          <AppointmentForm reFetch={getAllUsers} />
        ) : null}
      </Space>
      <br />
      <UsersList data={data} />
    </>
  );
};

export default HomePage;
