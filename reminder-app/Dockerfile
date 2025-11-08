FROM node:alpine AS build

WORKDIR /app

COPY reminder-app/package*.json ./

RUN npm install --production

COPY reminder-app/ .

RUN npm run build:pwa


FROM nginx:alpine

COPY --from=build app/www /usr/share/nginx/html

EXPOSE 80
