import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/main.config';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    StorageModule
  ]
})
export class AppModule {}
