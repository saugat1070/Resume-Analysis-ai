FROM node:latest

WORKDIR /home/app/

COPY src/server.js /home/app/src/server.js
COPY src /home/app/src
COPY package.json /home/app/package.json
COPY .env.local /home/app/.env.local
RUN npm install

EXPOSE 3000
CMD [ "node","src/server.js" ]