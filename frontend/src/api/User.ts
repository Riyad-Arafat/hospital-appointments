import { http } from "utils/http";
import { AxiosResponse } from "axios";
import { GetAppointmentsResponse } from "types/Appoinment.type";
import { AllUsersResponse, UpdateUserRequest, UserType } from "types/User.type";
import { QueryProps } from "types/Common.type";

export const getCurrentUserAppointments = async (): Promise<
  AxiosResponse<GetAppointmentsResponse>
> => {
  return await http().get(`/me/appointments`);
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

export const getAllUsersApi = async (
  query?: QueryProps
): Promise<AxiosResponse<AllUsersResponse>> => {
  return await http().get("/users", { params: query });
};
