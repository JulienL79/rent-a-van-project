import { z } from "zod";

export const bookingsRegisterValidation = z
  .object({
    ownerId: z.uuid({ message: "L'identifiant du propriétaire est invalide." }),
    vehicleId: z.uuid({ message: "L'identifiant du véhicule est invalide." }),
    optionId: z
      .uuid({ message: "L'identifiant de l'option est invalide." })
      .optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    renterAddressStreet: z
      .string()
      .trim()
      .min(1, { message: "La rue est requise" })
      .max(255, { message: "La rue ne doit pas dépasser 255 caractères" }),
    renterAddressCity: z
      .string()
      .trim()
      .min(1, { message: "La ville est requise" })
      .max(255, { message: "La ville ne doit pas dépasser 255 caractères" }),
    renterAddressZip: z
      .string()
      .trim()
      .length(5, { message: "Le code postal doit contenir 5 caractères" }),
    renterAddressCountry: z
      .string()
      .trim()
      .min(1, { message: "Le pays est requis" })
      .max(255, { message: "Le pays ne doit pas dépasser 255 caractères" }),
    insuranceContract: z
      .string()
      .trim()
      .max(255, {
        message: "Le contrat d'assurance ne doit pas dépasser 255 caractères",
      })
      .optional(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "La date de début doit être antérieure à la date de fin",
    path: ["endDate"],
  });

export const bookingsUpdateValidation = z
  .object({
    optionId: z
      .uuid({ message: "L'identifiant de l'option est invalide." })
      .optional(),
    discountCode: z
      .string()
      .max(50, { message: "Le code est trop long." })
      .optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    renterAddressStreet: z
      .string()
      .trim()
      .min(1, { message: "La rue est requise" })
      .max(255, { message: "La rue ne doit pas dépasser 255 caractères" }),
    renterAddressCity: z
      .string()
      .trim()
      .min(1, { message: "La ville est requise" })
      .max(255, { message: "La ville ne doit pas dépasser 255 caractères" }),
    renterAddressZip: z
      .string()
      .trim()
      .length(5, { message: "Le code postal doit contenir 5 caractères" }),
    renterAddressCountry: z
      .string()
      .trim()
      .min(1, { message: "Le pays est requis" })
      .max(255, { message: "Le pays ne doit pas dépasser 255 caractères" }),
    status: z.enum(["pending", "confirmed", "cancelled", "finished"], {
      message: "Statut de réservation invalide.",
    }),
    ownerAddressStreet: z
      .string()
      .trim()
      .min(1, { message: "La rue est requise" })
      .max(255, { message: "La rue ne doit pas dépasser 255 caractères" }),
    ownerAddressCity: z
      .string()
      .trim()
      .min(1, { message: "La ville est requise" })
      .max(255, { message: "La ville ne doit pas dépasser 255 caractères" }),
    ownerAddressZip: z
      .string()
      .trim()
      .length(5, { message: "Le code postal doit contenir 5 caractères" }),
    ownerAddressCountry: z
      .string()
      .trim()
      .min(1, { message: "Le pays est requis" })
      .max(255, { message: "Le pays ne doit pas dépasser 255 caractères" }),
    insuranceContract: z
      .string()
      .trim()
      .max(255, {
        message: "Le contrat d'assurance ne doit pas dépasser 255 caractères",
      })
      .optional(),
    updatedAt: z.date().optional(),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "La date de début doit être antérieure à la date de fin",
    path: ["endDate"],
  });
