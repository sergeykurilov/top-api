FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN yarn install
ADD . .
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline
CMD['node', './dist/main.js']