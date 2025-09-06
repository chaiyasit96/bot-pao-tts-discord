# --------- BUILD STAGE ---------
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# --------- RUN STAGE ---------
FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

RUN apt-get update && apt-get install -y ffmpeg

EXPOSE 3000

CMD ["node", "dist/main.js"]