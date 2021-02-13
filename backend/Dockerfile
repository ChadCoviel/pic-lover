FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install && npm install -g sequelize && npm install -g sequelize-cli
COPY . .
CMD ["npm","start"]