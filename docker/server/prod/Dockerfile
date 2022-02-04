FROM node:16.13.1-alpine3.14 as builder
WORKDIR /app
ADD . ./
RUN npm ci --production
RUN npm install -g @zeit/ncc
RUN npm run build
RUN ncc build ./dist/main.js -o build

FROM node:16.13.1-alpine3.14
WORKDIR /nodejs2021Q4-service/
ADD --from=builder /app/build/index.js .
CMD ["node", "index.js"]