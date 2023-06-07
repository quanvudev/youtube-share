FROM node:18-alpine as node
ARG workdir=.
LABEL description="deploy react app"
WORKDIR /app
COPY ${workdir}/ /app/
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build
FROM nginx:1.12
COPY --from=node /app/dist/ /var/www/dist/
COPY --from=node /app/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]