"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const logger_1 = require("../logger/logger");
const users_1 = require("./entitys/users");
(0, typeorm_1.createConnection)().then(async (_) => {
    await (0, typeorm_1.getRepository)(users_1.User).save({
        login: 'admin',
        password: 'admin',
        name: 'Foo',
    });
    logger_1.logger.info('Postgres connected');
});
//# sourceMappingURL=connection.js.map