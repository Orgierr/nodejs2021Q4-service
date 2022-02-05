# RS School REST service

## App endpoints

Access to all routes except /login, /doc requires authentication

```
Authorization: Bearer <token>
```

1. `User` (`/users` route)
   - `GET /users` - get all users (remove password from response)
   - `GET /users/:userId` - get the user by id (ex. “/users/123”) (remove password from response)
   - `POST /users` - create user
   - `PUT /users/:userId` - update user
   - `DELETE /users/:userId` - delete user
2. `Board` (`/boards` route)
   - `GET /boards` - get all boards
   - `GET /boards/:boardId` - get the board by id
   - `POST /boards` - create board
   - `PUT /boards/:boardId` - update board
   - `DELETE /boards/:boardId` - delete board
3. `Task` (`/boards/:boardId/tasks` route)
   - `GET /boards/:boardId/tasks` - get all tasks
   - `GET /boards/:boardId/tasks/:taskId` - get the task by id
   - `POST /boards/:boardId/tasks` - create task
   - `PUT /boards/:boardId/tasks/:taskId` - update task
   - `DELETE /boards/:boardId/tasks/:taskId` - delete task
4. `Column` (`/boards/:boardId/columns` route)
   - `GET /boards/:boardId/columns` - get all columns
   - `GET /boards/:boardId/columns/:columnId` - get the column by id
   - `POST /boards/:boardId/columns` - create column
   - `PUT /boards/:boardId/columns/:columnId` - update column
   - `DELETE /boards/:boardId/columns/:columnId` - delete column
5. `File` (`/file` route)
   - `GET /file/:fileName` - get file by name
   - `POST /file` - upload file
6. `Login` (`/login` route)
   - `POST /login` - login to app by login and password,receive JWT token
7. `Login` (`/doc` route)
   - `GET /doc` - swagger ui

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager (>=16.0.0).

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Migrate TypeORM

Generate migration

```
npm run migration:gen {Migration name}
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

Production

```
docker-compose -f docker-compose.prod.yaml up --build
```

## Running application

```
npm run start
```

```
npm run start:dev
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

## Performance Comparison

### Express

| vusers.created_by_name.0     | 6000   |
| ---------------------------- | ------ |
| vusers.created.total         | 6000   |
| vusers.completed             | 6000   |
| vusers.session_length-min    | 257.7  |
| vusers.session_length-max    | 934.1  |
| vusers.session_length-median | 415.8  |
| vusers.session_length-p95    | 528.6  |
| vusers.session_length-p99    | 572.6  |
| http.request_rate            | 60/sec |
| http.requests                | 35401  |
| http.codes.201               | 11800  |
| http.responses               | 35400  |
| http.codes.200               | 17700  |
| http.codes.204               | 5900   |
| http.response_time-min       | 0      |
| http.response_time-max       | 412    |
| http.response_time-median    | 68.7   |
| http.response_time-p95       | 172.5  |
| http.response_time-p99       | 206.5  |

### Fastify

| vusers.created_by_name.0     | 5900   |
| ---------------------------- | ------ |
| vusers.created.total         | 5900   |
| vusers.completed             | 5900   |
| vusers.session_length-min    | 257.7  |
| vusers.session_length-max    | 934.1  |
| vusers.session_length-median | 415.8  |
| vusers.session_length-p95    | 528.6  |
| vusers.session_length-p99    | 572.6  |
| http.request_rate            | 60/sec |
| http.requests                | 35401  |
| http.codes.201               | 11800  |
| http.responses               | 35400  |
| http.codes.200               | 17700  |
| http.codes.204               | 5900   |
| http.response_time-min       | 0      |
| http.response_time-max       | 412    |
| http.response_time-median    | 68.7   |
| http.response_time-p95       | 172.5  |
| http.response_time-p99       | 206.5  |
