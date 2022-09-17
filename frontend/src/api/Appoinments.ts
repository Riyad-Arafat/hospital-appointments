import { http } from "@utils/http";
import { AxiosResponse } from "axios";
import { AppointmentRequest, AppointmenType } from "src/types/Appoinment.type";

// function to create appointment and return status
export const createAppointmentAPI = async (
  data: AppointmentRequest
): Promise<AxiosResponse> => {
  return await http().post("/appointments", { ...data });
};

// function to get a appointment by id and return appointment
export const getAppointmentByIdAPI = async (
  appointmentId: string
): Promise<AxiosResponse<AppointmenType>> => {
  return await http().get(`/appointments/${appointmentId}`);
};

// function to update appointment and return status
export const updateAppointmentAPI = async (
  data: AppointmentRequest
): Promise<AxiosResponse> => {
  return await http().put("/appointments", { ...data });
};

// function to delete appointment and return status
export const deleteAppointmentAPI = async (
  appointmentId: string
): Promise<AxiosResponse> => {
  return await http().delete(`/appointments/${appointmentId}`);
};
