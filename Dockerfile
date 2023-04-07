FROM node:18-alpine

# Diretorio
WORKDIR /app

COPY . . 
# COPY ./.env.production ./.env

RUN yarn install --frozen-lockfile

# EXPOSE 3000

CMD ["yarn", "dev"]