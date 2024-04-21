# Build Environment: Node + Playwright
FROM node:17
FROM mcr.microsoft.com/playwright:focal

# Env
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Export port 3000 for Node
EXPOSE 3001

# Copy all app files into Docker Work directory
COPY package*.json /app/
COPY miarchivo.js /app/
COPY server.js /app/

# Install Deps
RUN npm install

# Run Node index.js file
CMD [ "npm", "start" ]
