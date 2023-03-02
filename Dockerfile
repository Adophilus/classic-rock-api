FROM alpine:3.14

RUN apk add bash
RUN ["/bin/bash", "-c", "apk add --no-cache python3 python3-pip" ]
RUN apk add --no-cache nodejs npm

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY . .
RUN pnpm install --frozen-lockfile --prod

RUN pnpm project:setup
RUN pnpm build:all

CMD [ "pnpm", "start" ]
