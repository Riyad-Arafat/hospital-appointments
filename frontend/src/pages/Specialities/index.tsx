import { useEffect } from "react";
import useDispatch from "hooks/useDispatch";
import { ActionTypes } from "types/Atcions.typs";
import { GetAllSpecialitiesResponse } from "types/Speciality.types";
import SpecialitiesList from "components/SpecialitiesComponents/SpecialitiesList";
import SpecialityForm from "components/SpecialitiesComponents/SpecialityForm";
import { Space } from "antd";

const SpecialitiesPage = () => {
  const { dispatch, data } = useDispatch<GetAllSpecialitiesResponse>();
  const getAppointments = async () => {
    dispatch({
      type: ActionTypes.GET_ALL_SPECIALTIES,
      payload: {},
    });
  };

  useEffect(() => {
    getAppointments();
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
        <SpecialityForm reFetch={getAppointments} />
      </Space>
      <br />
      <SpecialitiesList data={data} reFetch={getAppointments} />
    </>
  );
};

export default SpecialitiesPage;
