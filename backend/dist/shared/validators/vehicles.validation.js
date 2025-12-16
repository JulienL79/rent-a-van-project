import { z } from "zod";
export const vehiclesRegisterValidation = z.object({
  categoryId: z.uuid({ message: "ID catégorie invalide" }),
  brand: z
    .string()
    .trim()
    .min(1, { message: "La marque est requise" })
    .max(100, { message: "La marque ne doit pas dépasser 100 caractères" }),
  model: z
    .string()
    .trim()
    .min(1, { message: "Le modèle est requis" })
    .max(100, { message: "Le modèle ne doit pas dépasser 100 caractères" }),
  mileage: z.coerce
    .number()
    .int()
    .min(0, { message: "Le kilométrage doit être positif" })
    .max(1000000, {
      message: "Le kilométrage doit être inférieur à de 1 000 000km",
    }),
  registrationDate: z.coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "La date d'immatriculation est requise",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      },
      {
        message: "La date doit être antérieure à aujourd'hui",
      },
    ),
  registrationPlate: z
    .string()
    .trim()
    .length(7, {
      message: "La plaque d'immatriculation doit contenir 7 caractères",
    })
    .transform((val) => val.toUpperCase()),
  description: z.string().trim().max(500, {
    message: "La description ne doit pas dépasser 500 caractères",
  }),
  numberOfSeats: z.coerce
    .number()
    .int()
    .min(1, { message: "Le véhicule doit avoir au moins 1 siège" })
    .max(10, {
      message: "Le véhicule ne peut pas avoir plus de 10 sièges",
    }),
  numberOfSleepingPlaces: z.coerce
    .number()
    .int()
    .min(0, {
      message: "Les places pour dormir doivent être un nombre valide",
    })
    .max(10, {
      message: "Le véhicule ne peut pas avoir plus de 10 couchages",
    }),
  length: z.coerce
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "La longueur doit être un nombre valide",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "La longueur doit être supérieur à 0",
    })
    .refine((val) => parseFloat(val) < 10, {
      message: "La longueur doit être inférieur à 10",
    }),
  height: z.coerce
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "La hauteur doit être un nombre valide",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "La hauteur doit être supérieur à 0",
    })
    .refine((val) => parseFloat(val) < 5, {
      message: "La hauteur doit être inférieur à 5",
    }),
  weight: z.coerce
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Le poids doit être un nombre valide",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Le poids doit être supérieur à 0",
    })
    .refine((val) => parseFloat(val) < 9999, {
      message: "Le poids doit être inférieur à 9999",
    }),
  fuelType: z.enum(["diesel", "petrol", "electric", "hybrid", "other"], {
    message: "Type de carburant invalide",
  }),
  gearType: z.enum(["manual", "automatic"], {
    message: "Type de transmission invalide",
  }),
  consumption: z.coerce
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "La consommation doit être un nombre valide",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "La consommation doit être supérieur à 0",
    })
    .refine((val) => parseFloat(val) < 9999, {
      message: "La consommation doit être inférieure à 100",
    }),
  cityName: z.string().trim().max(100, {
    message: "Le nom de la ville ne doit pas dépasser 100 caractères",
  }),
  cityCode: z.string().trim().max(100, {
    message: "Le code de la ville ne doit pas dépasser 100 caractères",
  }),
  insuranceNumber: z.string().trim().max(100, {
    message: "Le numéro d'assurance ne doit pas dépasser 100 caractères",
  }),
  insuranceExpirationDate: z.coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "La date d'expiration de l'assurance est requise",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: "La date d'expiration doit être aujourd'hui ou ultérieure",
      },
    ),
  basePrice: z.coerce
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Le prix journalier doit être un nombre valide",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Le prix journalier doit être supérieur à 0",
    })
    .refine((val) => parseFloat(val) < 1000, {
      message: "Le prix journalier doit être inférieur à 1000",
    }),
  isAvailable: z.boolean().default(false).optional(),
  equipmentIds: z.array(z.uuid({ message: "ID d'équipement invalide" })),
  pictures: z
    .array(
      z.url({ message: "L'URL de l'image est invalide" }).trim().max(255, {
        message: "L'URL de l'image ne doit pas dépasser 255 caractères",
      }),
    )
    .max(5, { message: "Tu ne peux pas ajouter plus de 5 images" })
    .optional(),
});
export const vehiclesUpdateValidation = z.object({
  categoryId: z.uuid({ message: "ID catégorie invalide" }),
  brand: z
    .string()
    .trim()
    .min(1, { message: "La marque est requise" })
    .max(100, { message: "La marque ne doit pas dépasser 100 caractères" }),
  model: z
    .string()
    .trim()
    .min(1, { message: "Le modèle est requis" })
    .max(100, { message: "Le modèle ne doit pas dépasser 100 caractères" }),
  mileage: z.coerce
    .number()
    .int()
    .min(0, { message: "Le kilométrage doit être positif" })
    .max(1000000, {
      message: "Le kilométrage doit être inférieur à de 1 000 000km",
    }),
  registrationDate: z.coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "La date d'immatriculation est requise",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      },
      {
        message: "La date doit être antérieure à aujourd'hui",
      },
    ),
  registrationPlate: z
    .string()
    .trim()
    .length(7, {
      message: "La plaque d'immatriculation doit contenir 7 caractères",
    })
    .transform((val) => val.toUpperCase()),
  description: z.string().trim().max(500, {
    message: "La description ne doit pas dépasser 500 caractères",
  }),
  numberOfSeats: z.coerce
    .number()
    .int()
    .min(1, { message: "Le véhicule doit avoir au moins 1 siège" })
    .max(10, {
      message: "Le véhicule ne peut pas avoir plus de 10 sièges",
    }),
  numberOfSleepingPlaces: z.coerce
    .number()
    .int()
    .min(0, {
      message: "Les places pour dormir doivent être un nombre valide",
    })
    .max(10, {
      message: "Le véhicule ne peut pas avoir plus de 10 couchages",
    }),
  length: z.coerce
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "La longueur doit être un nombre valide",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "La longueur doit être supérieur à 0",
    })
    .refine((val) => parseFloat(val) < 10, {
      message: "La longueur doit être inférieur à 10",
    }),
  height: z.coerce
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "La hauteur doit être un nombre valide",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "La hauteur doit être supérieur à 0",
    })
    .refine((val) => parseFloat(val) < 5, {
      message: "La hauteur doit être inférieur à 5",
    }),
  weight: z.coerce
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "Le poids doit être un nombre valide",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Le poids doit être supérieur à 0",
    })
    .refine((val) => parseFloat(val) < 9999, {
      message: "Le poids doit être inférieur à 9999",
    }),
  fuelType: z.enum(["diesel", "petrol", "electric", "hybrid", "other"], {
    message: "Type de carburant invalide",
  }),
  gearType: z.enum(["manual", "automatic"], {
    message: "Type de transmission invalide",
  }),
  consumption: z.coerce
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "La consommation doit être un nombre valide",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "La consommation doit être supérieur à 0",
    })
    .refine((val) => parseFloat(val) < 9999, {
      message: "La consommation doit être inférieure à 100",
    }),
  cityName: z.string().trim().max(100, {
    message: "Le nom de la ville ne doit pas dépasser 100 caractères",
  }),
  cityCode: z.string().trim().max(100, {
    message: "Le code de la ville ne doit pas dépasser 100 caractères",
  }),
  insuranceNumber: z.string().trim().max(100, {
    message: "Le numéro d'assurance ne doit pas dépasser 100 caractères",
  }),
  insuranceExpirationDate: z.coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: "La date d'expiration de l'assurance est requise",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: "La date d'expiration doit être aujourd'hui ou ultérieure",
      },
    ),
  basePrice: z
    .number()
    .min(0, { message: "Le prix journalier doit être positif" })
    .max(1000, { message: "Le prix journalier ne doit pas dépasser 1000€" })
    .transform((val) => val.toFixed(2)),
  isAvailable: z.boolean().default(false).optional(),
  equipmentIds: z
    .array(z.uuid({ message: "ID d'équipement invalide" }))
    .optional(),
});
