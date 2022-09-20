import React, { useMemo } from "react";
import {
  getUserByIdAPI,
  createUserAPI,
  getAllUsersApi,
  deleteUserByIdAPI,
  updateUserByIdAPI,
  getCurrentUserAppointments,
} from "api/User";
import {
  getAppointmentByIdAPI,
  createAppointmentAPI,
  updateAppointmentAPI,
  deleteAppointmentAPI,
} from "api/Appoinments";
import {
  AppointmenType,
  AppointmentRequest,
  GetAppointmentsResponse,
} from "types/Appoinment.type";
import { UpdateUserRequest, UserType, AllUsersResponse } from "types/User.type";
import {
  GetAllSpecialitiesResponse,
  GetSpecialityResponse,
  SpecialityRequest,
} from "types/Speciality.types";
import { AxiosError } from "axios";
import { ActionTypes } from "types/Atcions.typs";
import {
  createSpecialityAPI,
  deleteSpecialityAPI,
  getAllSpecialitiesAPI,
  updateSpecialityAPI,
} from "api/Speciality";
import { QueryProps } from "types/Common.type";
//   // User actions

type DataType =
  | UserType
  | AllUsersResponse
  | AppointmenType
  | GetAppointmentsResponse
  | GetSpecialityResponse
  | GetAllSpecialitiesResponse;

type Action =
  // ///////////// User actions //////////////////////////////////////////////////////////
  | { type: ActionTypes.GET_ALL_USERS; payload: { query: QueryProps } }
  | { type: ActionTypes.CREATE_USER; payload: UpdateUserRequest }
  | {
      type: ActionTypes.UPDATE_USER;
      payload: { user_id: string; data: UpdateUserRequest };
    }
  | {
      type: ActionTypes.GET_USER_BY_ID | ActionTypes.DELETE_USER;
      payload: { userId: string };
    }
  // /////////////// Appointment action ///////////////////////////////////////////////
  | { type: ActionTypes.GET_CURRENT_USER_APPPOINTMENTS; payload?: never }
  | {
      type: ActionTypes.CREATE_APPOINTMENT | ActionTypes.UPDATE_APPOINTMENT;
      payload: { data: AppointmentRequest; appointmentId?: string | number };
    }
  | {
      type:
        | ActionTypes.GET_USER_APPOINTMENTS_BY_ID
        | ActionTypes.DELETE_APPOINTMENT;
      payload: { appointmenId: string | number };
    }
  // /////////////// Speciality action ///////////////////////////////////////////////
  | { type: ActionTypes.CREATE_SPECIALTY; payload: SpecialityRequest }
  | {
      type: ActionTypes.GET_ALL_SPECIALTIES | ActionTypes.GET_SPECIALTY_BY_ID;
      payload: { id?: string };
    }
  | {
      type: ActionTypes.UPDATE_SPECIALTY | ActionTypes.DELETE_SPECIALTY;
      payload: { specialityId: string; data: SpecialityRequest };
    }
  | {
      type: ActionTypes.DELETE_SPECIALTY;
      payload: { specialityId: string };
    };

export function useDispatch<T = DataType>() {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<AxiosError | null>(null);

  // Keep state logic separated

  const dispatch = (props: Action) => {
    return new Promise<T | null>(async (resolve, reject) => {
      let data: T | null = null;
      try {
        switch (props.type) {
          case ActionTypes.GET_ALL_USERS:
            await getAllUsersApi(props.payload.query).then((res) => {
              data = res.data as T;
              setData(data);
            });
            break;

          case ActionTypes.GET_USER_BY_ID:
            await getUserByIdAPI(props.payload.userId).then((res) => {
              data = res.data as T;
              setData(data);
            });

            break;
          case ActionTypes.CREATE_USER:
            await createUserAPI(props.payload).then((res) => {
              data = res.data as T;
              setData(data);
            });

            break;
          case ActionTypes.DELETE_USER:
            await deleteUserByIdAPI(props.payload.userId).then((res) => {
              data = res.data as T;
              setData(data);
            });

            break;
          case ActionTypes.UPDATE_USER:
            await updateUserByIdAPI(
              props.payload.user_id,
              props.payload.data
            ).then((res) => {
              data = res.data as T;
              setData(data);
            });

            break;
          case ActionTypes.GET_CURRENT_USER_APPPOINTMENTS:
            await getCurrentUserAppointments().then((res) => {
              data = res.data as T;
              setData(data);
            });

            break;

          case ActionTypes.GET_USER_APPOINTMENTS_BY_ID:
            await getAppointmentByIdAPI(props.payload.appointmenId).then(
              (res) => {
                data = res.data as T;
                setData(data);
              }
            );
            break;
          case ActionTypes.CREATE_APPOINTMENT:
            await createAppointmentAPI(props.payload.data).then((res) => {
              data = res.data as T;
              setData(data);
            });
            break;
          case ActionTypes.UPDATE_APPOINTMENT:
            await updateAppointmentAPI(
              props.payload.appointmentId || "",
              props.payload.data
            ).then((res) => {
              data = res.data as T;
              setData(data);
            });
            break;

          case ActionTypes.DELETE_APPOINTMENT:
            await deleteAppointmentAPI(props.payload.appointmenId).then(
              (res) => {
                data = res.data as T;
                setData(data);
              }
            );
            break;

          case ActionTypes.CREATE_SPECIALTY:
            await createSpecialityAPI(props.payload).then((res) => {
              data = res.data as T;
              setData(data);
            });
            break;
          case ActionTypes.DELETE_SPECIALTY:
            await deleteSpecialityAPI(props.payload.specialityId).then(
              (res) => {
                data = res.data as T;
                setData(data);
              }
            );
            break;
          case ActionTypes.UPDATE_SPECIALTY:
            await updateSpecialityAPI(
              props.payload.specialityId,
              props.payload.data
            ).then((res) => {
              data = res.data as T;
              setData(data);
            });
            break;
          case ActionTypes.GET_ALL_SPECIALTIES:
            await getAllSpecialitiesAPI().then((res) => {
              data = res.data as T;
              setData(data);
            });
            break;
          default:
            break;
        }
        resolve(data);
      } catch (error: unknown) {
        let err = error as AxiosError<any>;
        err.message = err.response?.data.message || "Something went wrong";
        setError(err);
        reject(err);
      }
    });
  };

  return { ...useMemo(() => ({ data, error }), [data, error]), dispatch };
}

export default useDispatch;
