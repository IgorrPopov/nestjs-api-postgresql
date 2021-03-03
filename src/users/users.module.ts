import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from 'src/storage/storage.module';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    StorageModule,
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
