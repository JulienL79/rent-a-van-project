import { z } from "zod";

export const contactValidation = z.object({
  firstname: z
    .string()
    .trim()
    .min(1, { message: "Le prénom est requis" })
    .max(255, { message: "Le prénom ne doit pas dépasser 255 caractères" }),
  lastname: z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  email: z
    .email("Adresse e-mail invalide")
    .min(1, { message: "L'adresse e-mail est requis" }),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message:
        "Le numéro de téléphone doit être composé uniquement de 10 chiffres",
    })
    .min(1, { message: "Le numéro de téléphone est requis" }),
  subject: z.string().min(1, { message: "Le sujet est requis" }),
  message: z.string().min(1, { message: "Le message est requis" }),
});
