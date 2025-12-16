import type { ReactNode } from "react";
import type { IInputProps } from "../../atoms/Input";

export interface IFormFieldProps extends IInputProps {
  label: ReactNode;
  error?: string[];
}
