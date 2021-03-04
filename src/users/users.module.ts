import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudLoggerModule } from 'src/cloud-logger/cloud-logger.module';
import { FirebaseAdminModule } from 'src/firebase-admin/firebase-admin.module';
import { StorageModule } from 'src/storage/storage.module';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    FirebaseAdminModule,
    StorageModule,
    TypeOrmModule.forFeature([UserRepository]),
    CloudLoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
