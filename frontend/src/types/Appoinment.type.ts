export type TimeType = "hour" | "minute" | "hours" | "minutes";
export interface AppointmenType {
  id: number;
  title: string;
  description: string;
  doctor_id: string;
  client_id: string;
  time: `${number}-${TimeType}`;
  date: string;
}

export interface AppointmentRequest {
  title: string;
  description: string;
  doctor_id: string;
  client_id: string;
  time: `${number}-${TimeType}`;
  date: string;
}

export interface GetAppointmentsResponse {
  data: AppointmenType[];
}
