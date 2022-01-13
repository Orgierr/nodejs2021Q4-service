"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const logger_1 = require("../logger/logger");
(0, typeorm_1.createConnection)().then((_) => logger_1.logger.info('Postgres connected'));
//# sourceMappingURL=connection.js.map