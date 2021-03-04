import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/main.config';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import { CloudLoogerService } from './cloud-logger/cloud-looger.service';
import { CloudLoggerModule } from './cloud-logger/cloud-logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    StorageModule,
    FirebaseAdminModule,
    CloudLoggerModule
  ],
  providers: [CloudLoogerService]
})
export class AppModule {}
