"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
// Validator pour créer ou mettre à jour un utilisateur
exports.userValidation = zod_1.z.object({
  id: zod_1.z.uuid().optional(), // defaultRandom()
  roleName: zod_1.z.enum(["participant", "organizer"]),
  firstname: zod_1.z
    .string()
    .trim()
    .min(1, { message: "Le prénom est requis" })
    .max(255, { message: "Le prénom ne doit pas dépasser 255 caractères" }),
  lastname: zod_1.z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),
  birthdate: zod_1.z.coerce.date({
    message: "La date de naissance est requise",
  }),
  email: zod_1.z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email ne doit pas dépasser 255 caractères" }),
  phoneNumber: zod_1.z
    .string()
    .trim()
    .max(20, { message: "Le numéro de téléphone est trop long" }),
  password: zod_1.z
    .string()
    .trim()
    .min(6, {
      message: "Votre mot de passe doit contenir au moins 6 caractères",
    })
    .max(255, {
      message: "Le mot de passe ne doit pas dépasser 255 caractères",
    })
    .regex(/[0-9]/, {
      message: "Le mot de passe doit contenir au moins un chiffre",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Le mot de passe doit contenir au moins un caractère spécial",
    }),
  addressStreet: zod_1.z
    .string()
    .trim()
    .min(1, { message: "La rue est requise" })
    .max(255, { message: "La rue ne doit pas dépasser 255 caractères" }),
  addressCity: zod_1.z
    .string()
    .trim()
    .min(1, { message: "La ville est requise" })
    .max(255, { message: "La ville ne doit pas dépasser 255 caractères" }),
  addressZip: zod_1.z
    .string()
    .trim()
    .length(5, { message: "Le code postal doit contenir 5 caractères" }),
  addressCountry: zod_1.z
    .string()
    .trim()
    .min(1, { message: "Le pays est requis" })
    .max(255, { message: "Le pays ne doit pas dépasser 255 caractères" }),
  coordLat: zod_1.z.string().trim().min(1, { message: "Latitude incorrecte" }),
  coordLon: zod_1.z.string().trim().min(1, { message: "Longitude incorrecte" }),
  isEmail: zod_1.z.boolean().optional(),
  isSms: zod_1.z.boolean().optional(),
  language: zod_1.z.string().trim().max(10).optional(),
  theme: zod_1.z.string().trim().max(20).optional(),
  createdAt: zod_1.z.coerce.date().optional(),
  updatedAt: zod_1.z.coerce.date().optional(),
  tempTokenId: zod_1.z.uuid().optional(),
});
