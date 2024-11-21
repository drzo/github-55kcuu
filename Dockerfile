FROM node:16-slim

# Install SWI-Prolog
RUN apt-get update && apt-get install -y \
    swi-prolog \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose ports
EXPOSE 17001
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]