import { http } from "@utils/http";
import { AxiosResponse } from "axios";
import { GetAppointmentsResponse } from "src/types/Appoinment.type";
import {
  AllUsersResponse,
  Role,
  UpdateUserRequest,
  UserType,
} from "src/types/User.type";

export const getUserAppointmentsApi = async (
  userId: string
): Promise<AxiosResponse<GetAppointmentsResponse>> => {
  const { data } = await http().get(`/users/${userId}/appointments`);
  return data;
};

// function to create user by email and password and return token and type of token
export const createUserAPI = async (
  data: UpdateUserRequest
): Promise<AxiosResponse<UserType>> => {
  return await http().post("/users", { ...data });
};

// function to get specify user by id and return user
export const getUserByIdAPI = async (
  userId: string
): Promise<AxiosResponse<UserType>> => {
  return await http().get(`/users/${userId}`);
};

// function to update user by id and return status
export const updateUserByIdAPI = async (
  userId: string,
  data: UpdateUserRequest
): Promise<AxiosResponse> => {
  return await http().put(`/users/${userId}`, { ...data });
};

// function to delete user by id and return status
export const deleteUserByIdAPI = async (
  userId: string
): Promise<AxiosResponse> => {
  return await http().delete(`/users/${userId}`);
};

// function to get all users
interface Query {
  role: Role;
}
export const getAllUsersApi = async (
  query?: Query
): Promise<AxiosResponse<AllUsersResponse>> => {
  return await http().get("/users", { params: query });
};
