FROM node:16.15.0-alpine3.14 as build

ENV DISABLE_ESLINT_PLUGIN=true
ENV NODE_ENV production
ENV NODE_VERSION=16.15.0
ENV YARN_VERSION=1.22.17
ENV YARN_VERSION=8.9.0

ARG client_id
ENV REACT_APP_CLIENT_ID=$client_id

ARG client_secret
ENV REACT_APP_CLIENT_SECRET=$client_secret

ARG api_url
ENV REACT_APP_API_URL=$api_url

ARG https
ENV HTTPS=$https

ARG ssl_cert_file
ENV SSL_CERT_FILE=$ssl_cert_file

ARG port
ENV PORT=$https

ARG ssl_key_file
ENV SSL_KEY_FILE=$ssl_key_file

WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN yarn install --production

COPY . .

RUN yarn build


FROM nginx:1.21.0-alpine as base

ENV NODE_ENV production

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
