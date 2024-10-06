# Usando uma imagem base que seja compatível com ARM64
FROM node:20-alpine

# Instalando o Certbot
RUN apk add --no-cache certbot

# Criando o diretório de trabalho dentro do container
WORKDIR /app

# Copiando package.json e package-lock.json
COPY package*.json ./

# Instalando dependências
RUN npm install

# Copiando o resto do código da aplicação
COPY . .

# Expondo as portas 80 e 443
EXPOSE 80
EXPOSE 443

# Comando para rodar o servidor
CMD ["sh", "-c", "certbot renew --quiet --non-interactive && node server.js"]

