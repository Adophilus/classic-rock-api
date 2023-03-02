FROM alpine:3.14

RUN apk update
RUN apk upgrade
RUN apk add python3
RUN apk add python3-pip nodejs npm

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY . .
RUN pnpm install --frozen-lockfile --prod

RUN pnpm project:setup
RUN pnpm build:all

CMD [ "pnpm", "start" ]
