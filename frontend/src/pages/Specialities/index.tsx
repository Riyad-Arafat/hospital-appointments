import { useEffect } from "react";
import useDispatch from "hooks/useDispatch";
import { ActionTypes } from "types/Atcions.typs";
import { GetAllSpecialitiesResponse } from "types/Speciality.types";
import SpecialitiesList from "./SpecialitiesList";
import SpecialityForm from "./SpecialityForm";

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
    <div>
      <SpecialityForm reFetch={getAppointments} />
      <br />
      <SpecialitiesList data={data} reFetch={getAppointments} />
    </div>
  );
};

export default SpecialitiesPage;
