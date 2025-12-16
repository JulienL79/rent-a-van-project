import { z } from "zod";
export const picturesRegisterValidation = z.object({
  src: z.url().trim().max(255, {
    message: "L'URL de l'image ne doit pas dépasser 255 caractères",
  }),
  vehicleId: z.uuid({ message: "L'ID véhicule est invalide" }).optional(),
});
