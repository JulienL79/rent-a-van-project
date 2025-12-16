import type { ReactNode } from "react";
import type { IFormFieldProps } from "../../molecules/FormField";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import type { IFormFieldWithSuggestionProps } from "../../molecules/FormFieldWithSuggestion";

export type TFormValue = string | File | boolean | string[];
export type TFormFieldConfig =
  | ({ kind: "base" } & IFormFieldProps)
  | ({ kind: "suggestion" } & IFormFieldWithSuggestionProps);

export interface IFormProps {
  fields: TFormFieldConfig[];
  onSubmit: (data: { [key: string]: TFormValue }) => Promise<FormSubmitResult>;
  buttonContent: ReactNode;
  title: string;
  isDisabled?: boolean;
  type:
    | "login"
    | "register"
    | "resetPassword"
    | "updateProfile"
    | "updateVehicle"
    | "updateCredentials"
    | "contact"
    | "search"
    | "addVehicle";
}
