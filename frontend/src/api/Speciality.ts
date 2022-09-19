import { http } from "utils/http";
import { AxiosResponse } from "axios";
import {
  GetAllSpecialitiesResponse,
  GetSpecialityResponse,
  SpecialityRequest,
} from "types/Speciality.types";

// function to create Speciality and return status
export const createSpecialityAPI = async (
  data: SpecialityRequest
): Promise<AxiosResponse<{ data: GetSpecialityResponse }>> => {
  return await http().post("/specialities", { ...data });
};

// function to get a Speciality by id and return appointment
export const getSpecialityByIdAPI = async (
  specialityId: string
): Promise<AxiosResponse<{ data: GetSpecialityResponse }>> => {
  return await http().get(`/specialities/${specialityId}`);
};

// function to update Speciality and return status
export const updateSpecialityAPI = async (
  specialityId: string,
  data: SpecialityRequest
): Promise<AxiosResponse> => {
  return await http().put(`/specialities/${specialityId}`, {
    ...data,
  });
};

// function to delete Speciality and return status
export const deleteSpecialityAPI = async (
  specialityId: string
): Promise<AxiosResponse> => {
  return await http().delete(`/specialities/${specialityId}`);
};

// function to get all Specialities and return array of Specialities
export const getAllSpecialitiesAPI = async (): Promise<
  AxiosResponse<{ data: GetAllSpecialitiesResponse }>
> => {
  return await http().get("/specialities");
};
