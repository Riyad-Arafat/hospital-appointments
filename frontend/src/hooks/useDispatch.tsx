import React, { useMemo } from "react";
import {
  getUserByIdAPI,
  createUserAPI,
  getAllUsersApi,
  getUserAppointmentsApi,
  deleteUserByIdAPI,
  updateUserByIdAPI,
} from "src/api/User";
import {
  getAppointmentByIdAPI,
  createAppointmentAPI,
  updateAppointmentAPI,
  deleteAppointmentAPI,
} from "src/api/Appoinments";
import {
  AppointmenType,
  AppointmentRequest,
  GetAppointmentsResponse,
} from "src/types/Appoinment.type";
import {
  UpdateUserRequest,
  UserType,
  AllUsersResponse,
  Role,
} from "src/types/User.type";
import useAuth from "./useAuth";
import { AxiosError } from "axios";
import { ActionTypes } from "src/types/Atcions.typs";
//   // User actions

type DataType =
  | UserType
  | AllUsersResponse
  | AppointmenType
  | GetAppointmentsResponse;
type Action =
  // ///////////// User actions //////////////////////////////////////////////////////////
  | { type: ActionTypes.GET_ALL_USERS; payload: { query: { role: Role } } }
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
  | { type: ActionTypes.GET_CURRENT_USER_APPPOINTMENTS; payload: never }
  | {
      type: ActionTypes.CREATE_APPOINTMENT | ActionTypes.UPDATE_APPOINTMENT;
      payload: AppointmentRequest;
    }
  | {
      type:
        | ActionTypes.GET_USER_APPOINTMENTS_BY_ID
        | ActionTypes.DELETE_APPOINTMENT;
      payload: { appointmenId: string };
    };

export function useDispatch() {
  const [data, setData] = React.useState<DataType | null>(null);
  const [error, setError] = React.useState<AxiosError | unknown | null>(null);
  const { user } = useAuth();

  // Keep state logic separated

  const dispatch = React.useCallback(
    async (props: Action) => {
      try {
        switch (props.type) {
          case ActionTypes.GET_ALL_USERS:
            await getAllUsersApi(props.payload.query).then((res) => {
              setData(res.data);
            });
            break;

          case ActionTypes.GET_USER_BY_ID:
            await getUserByIdAPI(props.payload.userId).then((res) => {
              setData(res.data);
            });

            break;
          case ActionTypes.CREATE_USER:
            await createUserAPI(props.payload).then((res) => {
              setData(res.data);
            });

            break;
          case ActionTypes.DELETE_USER:
            await deleteUserByIdAPI(props.payload.userId).then((res) => {
              setData(res.data);
            });

            break;
          case ActionTypes.UPDATE_USER:
            await updateUserByIdAPI(
              props.payload.user_id,
              props.payload.data
            ).then((res) => {
              setData(res.data);
            });

            break;
          case ActionTypes.GET_CURRENT_USER_APPPOINTMENTS:
            await getUserAppointmentsApi(user?.id || "").then((res) => {
              setData(res.data);
            });

            break;

          case ActionTypes.GET_USER_APPOINTMENTS_BY_ID:
            await getAppointmentByIdAPI(props.payload.appointmenId).then(
              (res) => {
                setData(res.data);
              }
            );
            break;
          case ActionTypes.CREATE_APPOINTMENT:
            await createAppointmentAPI(props.payload).then((res) => {
              setData(res.data);
            });
            break;
          case ActionTypes.UPDATE_APPOINTMENT:
            await updateAppointmentAPI(props.payload).then((res) => {
              setData(res.data);
            });
            break;

          case ActionTypes.DELETE_APPOINTMENT:
            await deleteAppointmentAPI(props.payload.appointmenId).then(
              (res) => {
                setData(res.data);
              }
            );
            break;
          default:
            break;
        }
      } catch (error: unknown) {
        setError(error);
      }
    },
    [user?.id]
  );

  return [useMemo(() => ({ data, error }), [data, error]), dispatch];
}

export default useDispatch;
