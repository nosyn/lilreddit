FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn install --dev --non-interactive

RUN yarn prisma:generate

CMD [ "yarn", "prisma:seed" ]
# CMD [ "yarn", "prisma:migrate" ]


