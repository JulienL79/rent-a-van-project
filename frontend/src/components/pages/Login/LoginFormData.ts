import { zodFieldErrors } from "@rent-a-van/shared/utils/zodFieldErrors";
import { useAuthStore } from "../../../store/useAuthStore";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import type { IFormProps } from "../../organisms/Form";
import { emailValidation } from "@rent-a-van/shared/validators";

export const loginFormData: IFormProps = {
  title: "Connexion",
  type: "login",
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
    {
      kind: "base",
      id: "password",
      type: "password",
      placeholder: "",
      required: true,
      autoComplete: "current-password",
      label: "Mot de passe",
      onChange: () => {},
    },
  ],
  buttonContent: "Se connecter",
  onSubmit: async (formData: {
    [key: string]: string | File | boolean | string[];
  }): Promise<FormSubmitResult> => {
    const { login } = useAuthStore.getState();

    try {
      const password = formData.password as string;
      const payloadParsed = emailValidation.safeParse(formData);

      if (!payloadParsed.success) {
        const errors = zodFieldErrors(payloadParsed.error);
        return { ok: false, errors: errors };
      }

      await login(payloadParsed.data.email, password);
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }
      return { ok: false, errors: {} };
    }
  },
};
