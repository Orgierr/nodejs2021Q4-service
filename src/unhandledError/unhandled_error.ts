import { Inject, Logger, LoggerService } from '@nestjs/common';

export class UnhandledError {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {
    process.on('uncaughtException', (err) => {
      this.logger.error(err.stack ?? err.message, function () {
        process.exit(1);
      });
    });

    process.on('unhandledRejection', (err) => {
      throw err;
    });
  }
}
