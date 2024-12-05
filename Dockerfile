# Baseado em Nginx, que serve arquivos estáticos
FROM nginx:alpine

# Copiar arquivos estáticos para o Nginx
COPY ./public /usr/share/nginx/html

EXPOSE 8000
