import React, { useEffect, useMemo } from "react";
import { Select } from "antd";
import { useDispatch } from "hooks/useDispatch";
import { ActionTypes } from "types/Atcions.typs";
import { GetAllSpecialitiesResponse } from "types/Speciality.types";

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

export default Filter;
