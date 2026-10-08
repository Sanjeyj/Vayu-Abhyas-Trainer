# Stage 1: Build React Frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: Serve via Nginx
FROM nginx:alpine AS production
COPY --from=build-frontend /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
