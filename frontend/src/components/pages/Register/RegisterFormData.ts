import { createUser } from "../../../api/userApi";
import { TermsAndPrivacy } from "./TermAndPrivacy";
import type { UserRegisterPayload } from "@rent-a-van/shared/types/user.type";
import type { FormSubmitResult } from "../../../types/FormSubmitResult";
import type { IFormProps } from "../../organisms/Form";

export const registerFormData: IFormProps = {
  title: "Créer un compte",
  type: "register",
  fields: [
    {
      kind: "base",
      id: "firstName",
      type: "text",
      placeholder: "",
      required: true,
      autoComplete: "given-name",
      label: "Prénom*",
      onChange: () => {},
    },
    {
      kind: "base",
      id: "lastName",
      type: "text",
      placeholder: "",
      required: true,
      autoComplete: "family-name",
      label: "Nom de famille*",
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
    const payload: UserRegisterPayload = {
      firstname: formData.firstName as string,
      lastname: formData.lastName as string,
      email: formData.email as string,
      password: formData.password as string,
      confirmPassword: formData.confirmPassword as string,
      phoneNumber: formData.phoneNumber as string,
      birthdate: new Date(formData.birthdate as string),
      addressStreet: formData.addressStreet as string,
      addressCity: formData.addressCity as string,
      addressZip: formData.addressZip as string,
      addressCountry: formData.addressCountry as string,
      termsAccepted: formData.termsAccepted === true,
    };

    try {
      await createUser(payload);
      return { ok: true };
    } catch (error: any) {
      if (error.data && typeof error.data === "object") {
        return { ok: false, errors: error.data };
      }
      return { ok: false, errors: {} };
    }
  },
};
