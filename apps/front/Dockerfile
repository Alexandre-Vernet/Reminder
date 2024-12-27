FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build:front


FROM nginx:alpine

COPY apps/front/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/apps/front /usr/share/nginx/html

EXPOSE 80
