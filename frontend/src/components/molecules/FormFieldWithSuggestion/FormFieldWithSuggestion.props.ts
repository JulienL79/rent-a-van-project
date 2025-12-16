import type { ReactNode } from "react";
import type { IInputProps } from "../../atoms/Input";

export interface IFormFieldWithSuggestionProps extends IInputProps {
  label: ReactNode;
  error?: string[];
  fetchSuggestions: (query: string) => Promise<{ code: string; nom: string }[]>;
  withSuggestions: boolean;
}
