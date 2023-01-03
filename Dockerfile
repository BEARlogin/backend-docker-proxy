FROM node:18
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm i
COPY main.js .

EXPOSE 80

CMD ["node", "main.js"]
