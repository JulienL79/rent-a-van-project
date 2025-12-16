import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { requestLogger } from "./middlewares/index.js";
import router from "./routes/index.js";
import { env } from "./config/index.js";
import { logger } from "./utils/index.js";
import { initDatabase } from "./config/db-init.js";
// Initialise notre app express
const app = express();
app.set("trust proxy", 1);
const { PORT, ORIGIN } = env;
app.use(
  cors({
    origin: ORIGIN, // Autoriser UNIQUEMENT cette adresse à requêter sur mon serv
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Méthodes HTTPS autorisées (les autres seront bloquées)
    credentials: true,
  }),
);
app.use(cookieParser()); // traiter correctement avec les cookies
app.use(express.json()); // pour analyser les requêtes JSON
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
// Appel au router principal
app.use("/", router);
const startServer = async () => {
  // Initialise la DB avant de démarrer le serveur
  await initDatabase();
  app.listen(PORT, () => {
    // Mise en écoute du serveur
    logger.info("Le serveur est en écoute sur: http://localhost:" + PORT);
  });
};
startServer();
