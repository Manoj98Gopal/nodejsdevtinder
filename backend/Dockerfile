# Backend Dockerfile
# nodejsdevtinder/backend/Dockerfile

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 7777

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]