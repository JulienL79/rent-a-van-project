import { requestResetPassword } from "../../../api/resetApi";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import type { IFormProps } from "../../organisms/Form";

export const ResetRequestFormData: IFormProps = {
  title: "Demande de réinitialisation de mot de passe",
  type: "resetRequest",
  fields: [
    {
      kind: "base",
      id: "email",
      type: "email",
      placeholder: "",
      required: true,
      autoComplete: "email",
      label: "Adresse e-mail",
      onChange: () => {},
    },
  ],
  buttonContent: "Envoyer le mail",
  onSubmit: async (formData: {
    [key: string]: string | File | boolean | string[];
  }): Promise<FormSubmitResult> => {
    const email = formData.email as string;

    try {
      await requestResetPassword(email);
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }
      return { ok: false, errors: {} };
    }
  },
};
