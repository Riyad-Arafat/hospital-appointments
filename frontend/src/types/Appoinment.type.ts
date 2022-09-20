import { SpecialityType } from "./Speciality.types";
import { UserType } from "./User.type";

export type TimeType = "hour" | "minute" | "hours" | "minutes";
export interface AppointmenType {
  id: number;
  name: string;
  description: string;
  speciality: SpecialityType;
  client: UserType;
  date: string;
}

export interface AppointmentRequest {
  name: string;
  description: string;
  speciality_id: string;
  client_id: string;
  date: string;
}

export type GetAppointmentsResponse = { data: AppointmenType[] };
