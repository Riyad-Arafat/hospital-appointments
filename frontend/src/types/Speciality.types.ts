export interface SpecialityType {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface SpecialityRequest {
  name: string;
  description: string;
}

export type GetSpecialityResponse = { data: SpecialityType };

export type GetAllSpecialitiesResponse = { data: SpecialityType[] };
