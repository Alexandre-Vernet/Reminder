FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build:back

CMD ["node", "dist/apps/back/main.js"]
