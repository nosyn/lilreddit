FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY .env ./

RUN yarn --non-interactive

COPY ./prisma ./prisma

RUN yarn prisma:generate

COPY . .

CMD [ "yarn", "dev" ]

