FROM node:12.4.0-stretch-slim

RUN apt-get update

ENV PORT=3000
ENV NODE_ENV="production"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

COPY --chown=node:node . .

RUN npm install --quiet && npm cache clean --force
RUN npm rebuild node-sass --force
RUN npm run build

EXPOSE 3000

CMD ["npm","start"]
