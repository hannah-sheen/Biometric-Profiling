# Stage 1: Base Stage for Building (Common to both Dev and Prod)
FROM node:18 AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (this will be cached if package*.json are not changed)
RUN npm install

#--------------------------------------------------------------------------------------------------------------------------------

# Development Build
FROM base AS development

# Install development dependencies (for hot-reloading, etc.)
RUN npm install --only=development

# Expose port for development server (usually 3000 for React apps)
EXPOSE 3000

# Copy source code into the container
COPY . .

# Command to start the development server (Vite, Webpack, or similar)
CMD ["npm", "run", "dev"]


#--------------------------------------------------------------------------------------------------------------------------------

# # Production Build
# FROM node:18 AS build

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies (this will be cached if package*.json are not changed)
# RUN npm install

# # Copy the source code and build the app
# COPY . .

# # Build the app (this generates the production-ready static files)
# RUN npm run build

# # Use Nginx to serve the production build
# FROM nginx:alpine

# # Copy the production build output to Nginx's default directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Optionally, copy a custom Nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80 for production
# EXPOSE 80

# # Start Nginx in the foreground
# CMD ["nginx", "-g", "daemon off;"]