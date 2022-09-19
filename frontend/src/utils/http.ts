import Axios, { AxiosInstance, AxiosRequestHeaders } from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api`;

export const http = (): AxiosInstance => {
  const token = localStorage.getItem("token");
  const headers: AxiosRequestHeaders = {};

  if (token) {
    headers["Content-Type"] = "application/json";
    headers["Authorization"] = `Bearer ${token}`;
  }
  return Axios.create({
    baseURL: API_URL,
    headers,
  });
};
