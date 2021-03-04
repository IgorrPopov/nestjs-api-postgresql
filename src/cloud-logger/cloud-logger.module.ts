import { Module } from '@nestjs/common';
import { CloudLoogerService } from './cloud-looger.service';

@Module({
  providers: [CloudLoogerService],
  exports: [CloudLoogerService]
})
export class CloudLoggerModule {}
