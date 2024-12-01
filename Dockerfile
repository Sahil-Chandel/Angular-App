# Stage 1: Build the Angular app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the Nginx web directory
COPY --from=build /app/dist/<your-angular-app-name> /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow traffic
EXPOSE 80
