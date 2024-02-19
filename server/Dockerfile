FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN rm -rf ./node_modules
RUN rm -rf package-lock.json

COPY ./package.json .
RUN npm install

COPY . .

RUN npm install pm2@latest -g

EXPOSE 3001

CMD ["pm2-runtime", "start", "index.js", "--name", "server"]