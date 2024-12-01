# Use the official Node.js image to build the app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use an Nginx image to serve the built app
FROM nginx:alpine

# Copy the built app into the Nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
