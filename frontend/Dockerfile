FROM node:lts-slim

WORKDIR /app

COPY app/package*.json ./
COPY app/craco.config.js ./
RUN npm install

COPY app/public ./public
COPY app ./

WORKDIR /app/frontend/app
RUN npm run build

WORKDIR /app

CMD ["sh", "-c", "npm start"]
