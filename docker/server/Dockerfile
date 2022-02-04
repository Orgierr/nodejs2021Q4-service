FROM node:16.13.1-alpine3.14
WORKDIR /nodejs2021Q4-service/
ADD ./"package*.json" ./
RUN npm ci && npm cache clean --force
ADD . ./
CMD ["npm", "start"]