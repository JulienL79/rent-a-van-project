import { z } from "zod";

export const userRegisterValidation = z
  .object({
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
    birthdate: z.coerce
      .date()
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "La date de naissance est requise",
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
    email: z
      .email({ message: "Adresse email invalide" })
      .trim()
      .max(255, { message: "L'email ne doit pas dépasser 255 caractères" }),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^\d{10}$/, {
        message:
          "Le numéro de téléphone doit être composé uniquement de 10 chiffres",
      }),
    password: z
      .string()
      .trim()
      .min(6, {
        message: "Votre mot de passe doit contenir au moins 6 caractères",
      })
      .max(255, {
        message: "Le mot de passe ne doit pas dépasser 255 caractères",
      })
      .regex(/[0-9]/, {
        message: "Votre mot de passe doit contenir au moins un chiffre",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message:
          "Votre mot de passe doit contenir au moins un caractère spécial",
      }),
    confirmPassword: z.string().trim(),
    createdAt: z.coerce.date().optional(),
    drivingLicense: z
      .string()
      .trim()
      .max(255, {
        message: "Le permis de conduire ne doit pas dépasser 255 caractères",
      })
      .optional()
      .or(z.literal("").transform(() => undefined)),
    addressStreet: z
      .string()
      .trim()
      .min(1, { message: "La rue est requise" })
      .max(255, { message: "La rue ne doit pas dépasser 255 caractères" }),
    addressCity: z
      .string()
      .trim()
      .min(1, { message: "La ville est requise" })
      .max(255, { message: "La ville ne doit pas dépasser 255 caractères" }),
    addressZip: z
      .string()
      .trim()
      .length(5, { message: "Le code postal doit contenir 5 caractères" }),
    addressCountry: z
      .string()
      .trim()
      .min(1, { message: "Le pays est requis" })
      .max(255, { message: "Le pays ne doit pas dépasser 255 caractères" }),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions générales d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe doivent être identiques.",
    path: ["confirmPassword"],
  });

export const userUpdateValidation = z.object({
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
  birthdate: z.coerce
    .date()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: "La date de naissance est requise",
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
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message:
        "Le numéro de téléphone doit être composé uniquement de 10 chiffres",
    }),
  drivingLicense: z
    .string()
    .trim()
    .max(255, {
      message: "Le permis de conduire ne doit pas dépasser 255 caractères",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  addressStreet: z
    .string()
    .trim()
    .min(1, { message: "La rue est requise" })
    .max(255, { message: "La rue ne doit pas dépasser 255 caractères" }),
  addressCity: z
    .string()
    .trim()
    .min(1, { message: "La ville est requise" })
    .max(255, { message: "La ville ne doit pas dépasser 255 caractères" }),
  addressZip: z
    .string()
    .trim()
    .length(5, { message: "Le code postal doit contenir 5 caractères" }),
  addressCountry: z
    .string()
    .trim()
    .min(1, { message: "Le pays est requis" })
    .max(255, { message: "Le pays ne doit pas dépasser 255 caractères" }),
});

export const emailValidation = z.object({
  email: z
    .email({ message: "Adresse email invalide" })
    .trim()
    .max(255, { message: "L'email ne doit pas dépasser 255 caractères" }),
});

export const updateCredentialsValidation = z
  .object({
    email: z.email({ message: "Adresse email invalide" }).trim().max(255, {
      message: "L'email ne doit pas dépasser 255 caractères",
    }),
    oldPassword: z.string().trim(),
    password: z.string().trim().optional(),
    confirmPassword: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    const { password, confirmPassword } = data;

    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"],
          code: "custom",
          message: "Les mots de passe doivent être identiques.",
        });
      }
    }
    // Si password est fourni, on applique les règles
    if (password) {
      if (password.length < 6) {
        ctx.addIssue({
          path: ["password"],
          code: "custom",
          message: "Votre mot de passe doit contenir au moins 6 caractères",
        });
      }

      if (!/[0-9]/.test(password)) {
        ctx.addIssue({
          path: ["password"],
          code: "custom",
          message: "Votre mot de passe doit contenir au moins un chiffre",
        });
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        ctx.addIssue({
          path: ["password"],
          code: "custom",
          message:
            "Votre mot de passe doit contenir au moins un caractère spécial",
        });
      }
    }
  });

export const resetPasswordValidation = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, {
        message: "Votre mot de passe doit contenir au moins 6 caractères",
      })
      .max(255, {
        message: "Le mot de passe ne doit pas dépasser 255 caractères",
      })
      .regex(/[0-9]/, {
        message: "Votre mot de passe doit contenir au moins un chiffre",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message:
          "Votre mot de passe doit contenir au moins un caractère spécial",
      }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe doivent être identiques.",
    path: ["confirmPassword"],
  });

export const uuidValidator = z.uuid();
