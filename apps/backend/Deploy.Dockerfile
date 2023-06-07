FROM node:18-alpine3.17 AS base
RUN apk update
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install
RUN pnpm prisma:generate
RUN pnpm build
CMD [ "pnpm", "prod" ]
