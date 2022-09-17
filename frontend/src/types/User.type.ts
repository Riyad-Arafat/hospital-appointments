export type Role = "super_admin" | "doctor" | "client";

export interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
}

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
}

export interface AllUsersResponse {
  data: UserType[];
}
