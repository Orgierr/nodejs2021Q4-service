"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./common/config");
const app_1 = require("./app");
const logger_1 = require("./logger/logger");
app_1.app.listen(config_1.config.PORT, () => logger_1.logger.info(`App is running on http://localhost:${config_1.config.PORT}`));
//# sourceMappingURL=server.js.map