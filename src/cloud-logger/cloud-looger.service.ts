const pino = require("pino")("./logs/cloud-logger.log");

import { Injectable } from '@nestjs/common';
import { Entry, Log, Logging } from '@google-cloud/logging';
import { projectId } from '../config/main.config';

@Injectable()
export class CloudLoogerService {
  private readonly logging: Logging;

  constructor() {
    this.logging = new Logging({ projectId });
  }


  public sendErrorLog(service: string, contextId: string, message: string): void {
    const status = 'error';

    const log = this.logging.log(status + '_log');

    const metadata = {
      resource: { type: 'global' },
      // See: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
      severity: 'ERROR',
    };

    const logMessage = `[${status}] [${service}] ${message} [contextId - ${contextId}]`;
    const entry = log.entry(metadata, logMessage);
    this.writeLog(log, entry, logMessage);

    pino.error(logMessage);
  }

  public sendInfoLog(service: string, contextId: string, message: string): void {
    const status = 'info';

    const log = this.logging.log(status + '_log');

    const metadata = {
      resource: { type: 'global' },
      severity: 'INFO',
    };

    const logMessage = `[${status}] [${service}] ${message} [contextId - ${contextId}]`;
    const entry = log.entry(metadata, logMessage);
    this.writeLog(log, entry, logMessage);

    pino.info(logMessage);
  }

  private async writeLog(log: Log, entry: Entry, logMessage: string): Promise<void> {
    await log.write(entry);
    // console.log(`Logged: ${ logMessage }`); 
  }
}
