import { z } from "zod";

export const searchValidation = z
  .object({
    locationCode: z.string().length(5, { message: "Le code est incorrect" }),
    radius: z
      .string()
      .refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        "Le rayon doit être un nombre positif.",
      )
      .transform((val) => parseFloat(val)), // Convertir en nombre
    startDate: z
      .string()
      .refine(
        (val) => !isNaN(new Date(val).getTime()),
        "La date de début doit être une date valide.",
      )
      .refine(
        (date) => {
          const inputDate = new Date(date);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // on remet à minuit
          return inputDate >= today;
        },
        {
          message: "La date de début ne peut pas être antérieure à aujourd'hui",
        },
      )
      .transform((val) => new Date(val)), // Convertir en objet Date
    endDate: z
      .string()
      .refine(
        (val) => !isNaN(new Date(val).getTime()),
        "La date de fin doit être une date valide.",
      )
      .refine((date) => new Date(date) > new Date(), {
        message: "La date de fin ne peut pas être antérieure à aujourd'hui",
      })
      .transform((val) => new Date(val)), // Convertir en objet Date
    type: z.enum(["van", "camping-car"]),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "La date de début doit être antérieure à la date de fin.",
    path: ["startDate"], // Associe l'erreur à `startDate`
  });
