FROM node:alpine

WORKDIR /app

COPY reminder-api/package*.json ./

RUN npm install

COPY reminder-api/ .

RUN npm run build

CMD ["node", "dist/main.js"]
