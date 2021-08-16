FROM node:14-alpine as builder
WORKDIR /work

COPY package.json yarn.lock ./
RUN yarn install

RUN yarn install --production --modules-folder node_modules.production

COPY ./ ./
RUN yarn build

FROM node:14-alpine as runtime
WORKDIR /work

COPY --from=builder /work/node_modules.production ./node_modules
COPY --from=builder /work/dist ./
COPY --from=builder /work/configs ./configs

CMD [ "main" ]
