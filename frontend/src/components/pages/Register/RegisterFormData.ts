import { createUser } from "../../../api/userApi";
import { TermsAndPrivacy } from "./TermAndPrivacy";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import type { IFormProps } from "../../organisms/Form";
import { userRegisterValidation } from "@rent-a-van/shared/validators";
import { zodFieldErrors } from "@rent-a-van/shared/utils/zodFieldErrors";

export const registerFormData: IFormProps = {
  title: "Créer un compte",
  type: "register",
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
      id: "birthdate",
      type: "date",
      placeholder: "Sélectionnez votre date de naissance",
      required: true,
      autoComplete: "bday",
      label: "Date de naissance*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "addressStreet",
      type: "text",
      placeholder: "Ex : 12 rue des Lilas",
      required: true,
      autoComplete: "street-address",
      label: "Adresse*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "addressCity",
      type: "text",
      placeholder: "Ex : Paris",
      required: true,
      autoComplete: "address-level2",
      label: "Ville*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "addressZip",
      type: "text",
      placeholder: "Ex : 75001",
      required: true,
      autoComplete: "postal-code",
      label: "Code postal*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "addressCountry",
      type: "text",
      placeholder: "Ex : France",
      required: true,
      autoComplete: "country-name",
      label: "Pays*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "email",
      type: "email",
      placeholder: "Ex : nom@domaine.com",
      required: true,
      autoComplete: "email",
      label: "Adresse e-mail*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "phoneNumber",
      type: "tel",
      placeholder: "Ex : 0612754862",
      required: true,
      autoComplete: "tel",
      label: "Numéro de téléphone*",
      onChange: () => {},
    },
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
    {
      kind: "base",
      id: "termsAccepted",
      type: "checkbox",
      placeholder: "",
      required: true,
      autoComplete: "",
      label: TermsAndPrivacy, // ce composant affiche déjà le texte complet
      onChange: () => {},
    },
  ],
  buttonContent: "S'inscrire",
  onSubmit: async (formData: {
    [key: string]: string | File | boolean | string[];
  }): Promise<FormSubmitResult> => {
    try {
      const payloadParsed = userRegisterValidation.safeParse(formData);

      if (!payloadParsed.success) {
        const errors = zodFieldErrors(payloadParsed.error);
        return { ok: false, errors: errors };
      }
      await createUser(payloadParsed.data);
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }
      return { ok: false, errors: {} };
    }
  },
};
