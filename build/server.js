"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./common/config");
const app_1 = require("./app");
app_1.app.listen(config_1.config.PORT, () => console.log(`App is running on http://localhost:${config_1.config.PORT}`));
