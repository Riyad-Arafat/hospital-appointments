export interface QueryProps {
  role?: "doctor" | "client";
  speciality_id?: number;
}

export interface FormProps<T> {
  initialValues?: T;
  onSuccess?: () => void;
  onCancel?: () => void;
}
