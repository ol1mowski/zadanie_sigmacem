FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

ENV NODE_OPTIONS="--openssl-legacy-provider"

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 