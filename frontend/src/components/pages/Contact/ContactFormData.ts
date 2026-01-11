import type { IFormProps } from "../../organisms/Form";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";

export const contactFormData: IFormProps = {
  title: "Nous contacter",
  type: "contact",
  fields: [
    {
      kind: "base",
      id: "firstname",
      type: "text",
      placeholder: "",
      required: true,
      autoComplete: "given-name",
      label: "Prénom*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "lastname",
      type: "text",
      placeholder: "",
      required: true,
      autoComplete: "family-name",
      label: "Nom*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "email",
      type: "email",
      placeholder: "",
      required: true,
      autoComplete: "email",
      label: "Adresse e-mail*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "phone",
      type: "tel",
      placeholder: "",
      required: true,
      autoComplete: "tel",
      label: "Numéro de téléphone*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "subject",
      type: "text",
      placeholder: "",
      required: true,
      autoComplete: "off",
      label: "Sujet*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "message",
      type: "textarea",
      placeholder: "",
      required: true,
      autoComplete: "off",
      label: "Message*",
      onChange: () => {},
    },
  ],
  buttonContent: "Envoyer",
  onSubmit: async (): Promise<FormSubmitResult> => {
    try {
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }

      return { ok: false, errors: {} };
    }
  },
};
