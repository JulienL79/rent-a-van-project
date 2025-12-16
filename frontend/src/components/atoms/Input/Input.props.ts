export interface IInputProps {
  id: string;
  classNameInput?: string;
  value?: string | number | readonly string[];
  type: string;
  name?: string;
  placeholder: string;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  autoComplete?: string;
  step?: string;
  isDisabled?: boolean;
  options?: { label: string; value: string }[];
  checked?: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}
