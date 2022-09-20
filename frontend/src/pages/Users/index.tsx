import { useEffect } from "react";
import useDispatch from "hooks/useDispatch";
import { ActionTypes } from "types/Atcions.typs";
import UsersList from "components/UserComponets/UsersList";
import UserForm from "components/UserComponets/UserForm";
import { AllUsersResponse } from "types/User.type";
import { Space } from "antd";

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
    <>
      <Space
        style={{
          width: "100%",
          padding: "10px",
          justifyContent: "center",
        }}
        size="large"
      >
        <UserForm reFetch={getAllUsers} />
      </Space>
      <br />
      <UsersList data={data} reFetch={getAllUsers} />
    </>
  );
};

export default UsersPage;
