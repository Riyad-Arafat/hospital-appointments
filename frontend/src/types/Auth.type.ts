export interface RegisterResponse {
  user_id: string;
}
export interface RegisterProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoginProps {
  email: string;
  password: string;
}
