FROM node:latest

WORKDIR web

COPY ./web .

RUN npm install --silent
RUN npm install -g react-scripts serve --silent
RUN npm run test
RUN npm run build

CMD ["serve", "-s", "build", "-p", "3000"]
