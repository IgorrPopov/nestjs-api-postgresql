import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudLoggerModule } from '../cloud-logger/cloud-logger.module';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import { StorageModule } from '../storage/storage.module';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

console.log({ FirebaseAdminModule });
console.log({ StorageModule });
console.log({ TypeOrmModule });
console.log({ CloudLoggerModule });
console.log({ UserRepository });
console.log({ UsersController });
console.log({ UsersService });
console.log({ UsersService });


@Module({
  imports: [
    FirebaseAdminModule,
    StorageModule,
    TypeOrmModule.forFeature([UserRepository]),
    CloudLoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
