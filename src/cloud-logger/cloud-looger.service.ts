import { Injectable } from '@nestjs/common';
import { Entry, Log, Logging } from '@google-cloud/logging';
import { projectId } from '../config/main.config';

@Injectable()
export class CloudLoogerService {
  private readonly logging: Logging;

  constructor() {
    this.logging = new Logging({ projectId });
  }

  public sendLog(logName: string, logMessage: string): void {
    const log = this.logging.log(logName);

    const metadata = {
      resource: { type: 'global' },
      // See: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
      severity: 'ERROR',
    };

    const entry = log.entry(metadata, logMessage);

    this.writeLog(log, entry, logMessage);
  }

  private async writeLog(log: Log, entry: Entry, logMessage: string): Promise<void> {
    await log.write(entry);
    console.log(`Logged: ${ logMessage }`);
  }
}
