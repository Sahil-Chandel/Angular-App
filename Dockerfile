# Step 1: Build the Angular app using Node.js
FROM node:16 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the Angular app source code
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built Angular app from the build stage to Nginx's public directory
COPY --from=build /app/dist/angular-app /usr/share/nginx/html


# Expose port 80 for the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
