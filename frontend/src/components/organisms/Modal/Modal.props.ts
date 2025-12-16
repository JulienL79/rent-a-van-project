import type { IFormProps, TFormValue } from "../../organisms/Form/Form.props";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";
export interface IFormModalProps {
  onClose: () => void;
  onSubmit: (data: { [key: string]: TFormValue }) => Promise<FormSubmitResult>;
  formType: "addVehicle" | "updateVehicle";
  form: IFormProps;
  modalType: "form";
}

export interface IConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  modalType: "confirm";
}
