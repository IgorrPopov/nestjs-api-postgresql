const async_hooks = require('async_hooks');
import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudLoogerService } from '../cloud-logger/cloud-looger.service';
import { maxLimit } from '../common/constants/common.const';
import { PaginationDto } from '../common/dto/pagination.dto';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { StorageService } from '../storage/storage.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { executionContexts } from '../main';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly storageService: StorageService,
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly cloudLoggerService: CloudLoogerService
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {

    this.cloudLoggerService.sendInfoLog(
      'UsersService.create',
      executionContexts[async_hooks.executionAsyncId()]?.id,
      `input data: ${JSON.stringify(createUserDto)}`
    );

    return this.userRepository.createUser(createUserDto);
  }

  bulk(createUserDtos: CreateUserDto[]): Promise<User[]> {
    return this.userRepository.bulkUsers(createUserDtos);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    if (!Object.keys(updateUserDto).length) {
      throw new BadRequestException('Update request is empty');
    }

    return this.userRepository.updateUser(id, updateUserDto);
  }

  find(findUsersDto: FindUsersDto): Promise<User[]> {
    return this.userRepository.findUsers(findUsersDto);
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneUser(id);
  }

  findAll(paginationDto: PaginationDto): Promise<User[]> {
    let { start = 0, limit = maxLimit } = paginationDto;
    
    if (start < 0) start = 0;
    if (limit < 1 || limit > maxLimit) limit = maxLimit;

    return this.userRepository.findAllUsers({ start, limit });
  }

  remove(id: number): Promise<void> {
    return this.userRepository.removeUser(id);
  }

  upload(file: Express.Multer.File): Promise<void> {
    return this.storageService.uploadFile(file);
  }

  download(fileName: string): Promise<Buffer> {
    return this.storageService.downloadFile(fileName);
  }

  sendMessage(createMessageDto: CreateMessageDto): Promise<void> {
    return this.firebaseAdminService.sendMessage(createMessageDto);
  }
}
