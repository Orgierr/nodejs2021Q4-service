# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Migrate TypeORM

Generate migration

```
npm run migration:generate
```

Add tables to database

```
npm run migration:run
```

## Run in docker

```
cd {repository name}
```

```
docker-compose up --build
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

# Express

```
vusers.created_by_name.0: ...................................................... 6000
vusers.created.total: .......................................................... 6000
vusers.completed: .............................................................. 6000
vusers.session_length:
min: ......................................................................... 260.7
max: ......................................................................... 1523
median: ...................................................................... 441.5
p95: ......................................................................... 608
p99: ......................................................................... 804.5
http.request_rate: ............................................................. 60/sec
http.requests: ................................................................. 36000
http.codes.201: ................................................................ 12000
http.responses: ................................................................ 36000
http.codes.200: ................................................................ 18000
http.codes.204: ................................................................ 6000
http.response_time:
min: ......................................................................... 0
max: ......................................................................... 882
median: ...................................................................... 74.4
p95: ......................................................................... 190.6
p99: ......................................................................... 247.2
```

# Fastify

```
vusers.created_by_name.0: ...................................................... 5900
vusers.created.total: .......................................................... 5900
vusers.completed: .............................................................. 5900
vusers.session_length:
min: ......................................................................... 257.7
max: ......................................................................... 934.1
median: ...................................................................... 415.8
p95: ......................................................................... 528.6
p99: ......................................................................... 572.6
http.request_rate: ............................................................. 60/sec
http.requests: ................................................................. 35401
http.codes.201: ................................................................ 11800
http.responses: ................................................................ 35400
http.codes.200: ................................................................ 17700
http.codes.204: ................................................................ 5900
http.response_time:
min: ......................................................................... 0
max: ......................................................................... 412
median: ...................................................................... 68.7
p95: ......................................................................... 172.5
p99: ......................................................................... 206.5
```
