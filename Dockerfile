FROM node:16.13.0
USER root
RUN apt-get -y update
WORKDIR /app
COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["npm","start"]