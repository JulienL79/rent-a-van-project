import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import type { IFormProps } from "../../organisms/Form";

export const ResetConfirmFormData: IFormProps = {
  title: "Réinitialisation de mot de passe",
  type: "resetConfirm",
  fields: [
    {
      kind: "base",
      id: "password",
      type: "password",
      placeholder: "",
      required: true,
      autoComplete: "current-password",
      label: "Mot de passe*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "confirmPassword",
      type: "password",
      placeholder: "",
      required: true,
      autoComplete: "new-password",
      label: "Confirmer le mot de passe*",
      onChange: () => {},
    },
  ],
  buttonContent: "Mettre à jour",
  onSubmit: async (): Promise<FormSubmitResult> => {
    return { ok: true };
  },
};
