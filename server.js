import express from "express";
import http from "http";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Configuração do servidor Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "/public")));

// Error 404 - Página não encontrada
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Criar o servidor HTTP
http.createServer(app).listen(port, () => {
  console.log(`Servidor rodando na porta ${port} (HTTP)`);
});
