FROM alpine:3.14

EXPOSE 3000
RUN apk add --no-cache python3 py3-pip nodejs

RUN pip3 install -r requirements.txt
RUN python3 -m scripts.serializer
RUN enable corepack
RUN corepack prepare pnpm@latest --activate

CMD pnpm build
CMD pnpm start
