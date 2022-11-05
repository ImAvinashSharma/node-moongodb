FROM node:fermium-alpine3.16

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

CMD  ["node", "index.js"]