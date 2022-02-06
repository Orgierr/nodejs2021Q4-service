FROM node:16.13.1-alpine3.14 as builder
WORKDIR /app
ADD . ./
RUN npm ci
RUN npm install -g @zeit/ncc
RUN npm run build
RUN ncc build ./dist/src/main.js -o build

FROM node:16.13.1-alpine3.14
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .
COPY --from=builder /app/build .
CMD ["node", "./index.js"]