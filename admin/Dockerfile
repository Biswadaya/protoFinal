# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json package-lock.json ./

# Install dependencies (faster than `npm install`)
RUN npm ci

# Copy all other files
COPY . .

# Expose Vite's default port (5173)
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev"]