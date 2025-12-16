import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, "..", "public", "uploads");
export const deleteUploadedImage = (url) => {
  try {
    // Vérifie que l'URL commence bien par "/uploads/"
    if (!url.startsWith("/uploads/")) {
      console.error("URL invalide ou non autorisée :", url);
      return false;
    }
    // Extrait le nom du fichier depuis l'URL
    const filename = path.basename(url);
    // Construit le chemin absolu du fichier
    const filePath = path.join(UPLOAD_DIR, filename);
    // Vérifie si le fichier existe
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Fichier supprimé :", filePath);
      return true;
    } else {
      console.warn("Fichier introuvable :", filePath);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier :", error);
    return false;
  }
};
