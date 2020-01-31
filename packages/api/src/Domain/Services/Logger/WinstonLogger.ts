import { injectable } from 'inversify';
import { ILoggerService } from './ILoggerService';
import { createLogger, format, Logger, transports } from 'winston';
import { LogLevels } from './LogLevels';
import Sentry from 'winston-sentry-log';

@injectable()
/**
 * A simple logger that allow multiple transports
 */
export class WinstonLogger implements ILoggerService {
  private logger: Logger;
  private readonly logFormat = format.printf(function(info): string {
    const date = new Date().toISOString();
    return `[${date}] [${info.level}]: ${info.message}`;
  });

  public constructor() {
    this.logger = createLogger({
      format: this.logFormat,
      defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write to all loggers with level `info` and below to `combined.logger`
        // - Write all loggers error (and below) to `error.logger`.
        //
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/info.log' }),
      ],
    });
    if (process.env.SENTRY_DSN) {
      this.logger.add(new Sentry({ dsn: process.env.SENTRY_DSN, level: 'info' }));
    }

    //
    // If we're not in production then logger to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new transports.Console({
          format: this.logFormat,
        }),
      );
    }
  }

  public log(level: LogLevels, message: string): void {
    this.logger.log(level, message);
  }

  public error(error: Error): void {
    this.logger.error(error);
  }
}
