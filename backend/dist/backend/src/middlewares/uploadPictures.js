import multer from "multer";
import { APIResponse, logger } from "../utils/index.js";
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers PNG et JPG sont autorisés"));
  }
};
export const uploadPictures = (maxFiles) => {
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo max par fichier
    fileFilter,
  });
  return (req, res, next) => {
    logger.info(`[MIDDLEWARE] : uploadPictures (max ${maxFiles})`);
    upload.array("pictures", maxFiles)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          logger.error("Erreur Multer", err);
          return APIResponse(res, null, err.message, 400);
        }
        logger.error("Erreur d'upload", err);
        return APIResponse(res, null, err.message || "Erreur d'upload", 400);
      }
      next();
    });
  };
};
