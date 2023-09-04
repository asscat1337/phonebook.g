FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json ./
COPY  ./prisma /app/

RUN npm install
COPY . /app/

RUN npm run build

EXPOSE 3000
CMD ["node" ,"/app/dist/index.js"]
