# Stage 1: Build the Angular app
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Correct path to match your `angular.json` outputPath
COPY --from=build /app/dist/angular-app /usr/share/nginx/html

EXPOSE 80
