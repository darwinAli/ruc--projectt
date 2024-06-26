# Build Environment: Node + Puppeteer
FROM node:17
FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Export port 3000 for Node
EXPOSE 3001

# Copy all app files into Docker Work directory
COPY package*.json ./
COPY miarchivo.js ./
COPY server.js ./
COPY testDelete.js ./

# Install Deps
RUN npm install
RUN npx playwright install 

# Run Node index.js file
CMD [ "npm", "start" ]
