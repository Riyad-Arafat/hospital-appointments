import { Select, Space } from "antd";
import UsersList from "components/UserComponets/UsersList";
import { useDispatch } from "hooks/useDispatch";
import React, { useCallback, useEffect, useMemo } from "react";
import { ActionTypes } from "types/Atcions.typs";
import { QueryProps } from "types/Common.type";
import { GetAllSpecialitiesResponse } from "types/Speciality.types";
import { AllUsersResponse } from "types/User.type";

const HomePage = () => {
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
    <div>
      <Space
        style={{
          width: "100%",
          padding: "10px",
          justifyContent: "center",
        }}
        size="large"
      >
        <Filter onSearch={changeQuery} />
      </Space>
      <br />
      <UsersList data={data} />
    </div>
  );
};

interface FilterProps {
  onSearch: (value: number) => void;
}
const Filter = React.memo(({ onSearch }: FilterProps) => {
  const { dispatch: sDispathch, data: specialries } =
    useDispatch<GetAllSpecialitiesResponse>();

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
    <Select
      size="large"
      placeholder="Filter by Specialities"
      onSelect={onSearch}
    >
      <Select.Option value="">All</Select.Option>
      {Options}
    </Select>
  );
});

export default HomePage;
