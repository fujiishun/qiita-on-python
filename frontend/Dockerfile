FROM node:lts-slim

WORKDIR /app

COPY app/package*.json ./

RUN npm install

COPY . ./

WORKDIR app/frontend/app
RUN npm run build

WORKDIR /app

CMD ["npm", "start"]
