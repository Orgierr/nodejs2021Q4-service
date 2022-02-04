FROM node:16.13.1-alpine3.14 as builder
WORKDIR /app
ADD . ./
RUN npm ci --production
RUN npm install -g @zeit/ncc
RUN npm install -g nest
RUN npm run build
RUN ncc build ./dist/main.js -o build

FROM node:16.13.1-alpine3.14
WORKDIR /app
COPY --from=builder /app/build .
CMD ["node", "./index.js"]