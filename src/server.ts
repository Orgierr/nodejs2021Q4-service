import { config } from './common/config';
import { app } from './app';
import { logger } from './logger/logger';

app.listen(config.PORT, () =>
  logger.info(`App is running on http://localhost:${config.PORT}`)
);
