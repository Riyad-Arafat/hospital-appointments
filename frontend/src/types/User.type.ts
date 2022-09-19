import { AppointmenType } from "./Appoinment.type";
import { SpecialityType } from "./Speciality.types";

export type Role = "super_admin" | "doctor" | "client";

export interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  speciality?: SpecialityType;
  appointments?: AppointmenType[];
  arraival_time?: number;
}

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  arraival_time: number;
}

export interface UpdateUserResponse {
  user: UserType;
}

export type AllUsersResponse = {
  data: UserType[];
};
