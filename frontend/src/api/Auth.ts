import { http } from "@utils/http";
import { AxiosResponse } from "axios";
import {
  LoginProps,
  LoginResponse,
  RegisterProps,
  RegisterResponse,
} from "src/types/Auth.type";
import { UserType } from "src/types/User.type";

export const getCurrentUserAPI = async (): Promise<AxiosResponse<UserType>> => {
  return await http().get(`/me`);
};

// function to register user by email and password and return token and type of token
export const registerAPI = async (
  data: RegisterProps
): Promise<AxiosResponse<RegisterResponse>> => {
  return await http().post("/register", { ...data });
};

// function to login user by email and password and return token and type of token
export const loginAPI = async (
  data: LoginProps
): Promise<AxiosResponse<LoginResponse>> => {
  return await http().post("/login", { ...data });
};

// function to logout user and return status
export const logoutAPI = async (): Promise<AxiosResponse> => {
  return await http().post("/logout");
};
