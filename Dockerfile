# Build Environment: Node + Playwright
FROM node:19
FROM mcr.microsoft.com/playwright:focal

# Env
WORKDIR /usr/src/app/
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Export port 3000 for Node
EXPOSE 3001

# Copy all app files into Docker Work directory
COPY package*.json ./
COPY miarchivo.js ./
COPY server.js ./

# Install Deps
RUN npm install

# Run Node index.js file
CMD [ "npm", "start" ]
