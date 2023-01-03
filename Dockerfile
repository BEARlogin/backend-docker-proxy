FROM node:18
ARG HOST_PORT

WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm i
COPY . .

EXPOSE ${HOST_PORT}

CMD ["node", "main.js"]
