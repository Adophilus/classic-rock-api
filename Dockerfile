FROM alpine:3.14

RUN apk update
RUN apk upgrade
RUN apk add python3
RUN apk add nodejs
RUN apk add npm

RUN npm install -g pnpm

COPY . .
RUN pnpm install --frozen-lockfile --prod

RUN pnpm project:setup
RUN echo $PWD
RUN pnpm project:setup
RUN pnpm build:all

CMD pnpm start
