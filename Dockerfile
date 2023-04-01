FROM node:18-alpine

# Diretorio
WORKDIR /usr/src/api

COPY . .
COPY ./.env.production ./.env

RUN yarn install --frozen-lockfile

RUN yarn build

EXPOSE 3000

CMD ["yarn", "prod"]