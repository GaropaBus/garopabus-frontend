# Usando uma imagem base que seja compatível com ARM64
FROM node:20-alpine

# Criando o diretório de trabalho dentro do container
WORKDIR /app

# Copiando package.json e package-lock.json
COPY package*.json ./

# Instalando dependências
RUN npm install

# Copiando o resto do código da aplicação
COPY . .

# Expondo a porta 80
EXPOSE 80

# Comando para rodar o servidor
CMD ["npm", "start"]
