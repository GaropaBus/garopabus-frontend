import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
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

// Verifica se o ambiente é de produção
if (process.env.NODE_ENV === "production") {
  // Carregar os certificados
  const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/garopabus.uk/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/garopabus.uk/fullchain.pem"),
  };

  // Criar o servidor HTTPS
  https.createServer(options, app).listen(443, () => {
    console.log(`Servidor rodando na porta 443 (HTTPS)`);
  });

  http
    .createServer((req, res) => {
      // Redirecionar para HTTPS
      res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
      res.end();
    })
    .listen(80, () => {
      console.log(
        `Servidor rodando na porta 80 (HTTP) e redirecionando para HTTPS`
      );
    });
} else {
  // Para desenvolvimento, criar o servidor HTTP na porta 8080
  http.createServer(app).listen(port, () => {
    console.log(`Servidor rodando na porta ${port} (HTTP)`);
  });
}
