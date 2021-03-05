const async_hooks = require('async_hooks');
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CloudLoogerService } from 'src/cloud-logger/cloud-looger.service';
import { maxLimit } from 'src/common/constants/common.const';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { executionContexts } from '../main';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
 
  private readonly cloudLoggerService: CloudLoogerService;

  constructor() {
    super();
    this.cloudLoggerService = new CloudLoogerService();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {

    this.cloudLoggerService.sendInfoLog(
      'UserRepository.createUser (before adding to database)',
      executionContexts[async_hooks.executionAsyncId()]?.id,
      `input data: ${JSON.stringify(createUserDto)}`
    );

    const user: User = this.create(createUserDto);

    try {
      await user.save();

      this.cloudLoggerService.sendInfoLog(
        'UserRepository.createUser (after adding to database)',
        executionContexts[async_hooks.executionAsyncId()]?.id,
        `output data: ${JSON.stringify(user)}`
      );

      return user;
    } catch (error) {

      this.cloudLoggerService.sendErrorLog(
        'UserRepository.createUser (unable to add user)',
        executionContexts[async_hooks.executionAsyncId()]?.id,
        `output data: ${error.message}`
      );

      throw new BadRequestException('Unable to create user unexpected error occurred');
    }
  }

  async bulkUsers(createUserDtos: CreateUserDto[]): Promise<User[]> {
    const users: User[] = this.create(createUserDtos);

    try {
      await this.insert(users);
      return users;
    } catch (error) {
      throw new BadRequestException('Unable to create users unexpected error occurred');
    }
    
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userUpdateResult: UpdateResult = await this.update(id, updateUserDto);

      if (userUpdateResult.affected !== 1) {
        throw new NotFoundException(`There is no user with id: ${id}`);
      }
      
      return this.findOneUser(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Unable to update user unexpected error occurred');
    }
  }

  async findOneUser(id: number): Promise<User> {
    try {
      const user: User = await this.findOne(id);

      if (!user) {
        throw new NotFoundException(`There is no user with id: ${id}`);
      }
      
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Unable to find user unexpected error occurred'); 
    }
  }

  async findAllUsers (paginationDto: PaginationDto): Promise<User[]> {
    const { start, limit } = paginationDto;

    try {
      const users = await this.find({
        take: limit,
        skip: start
      });
  
      return users;
    } catch (error) {
      throw new BadRequestException('Unable to find users unexpected error occurred');
    }
  }

  async findUsers (findUsersDto: FindUsersDto): Promise<User[]> {
    try {
      const users: User[] = await this.find({
        where: { ...findUsersDto },
        take: maxLimit
      });
  
      return users;
    } catch (error) {
      throw new BadRequestException('Unable to find users unexpected error occurred');
    }
  }

  async removeUser(id: number): Promise<void> {
    try {
      const userDeleteResult: DeleteResult = await this.delete(id);
      
      if (userDeleteResult.affected !== 1) {
        throw new NotFoundException(`There is no user with id: ${id}`);
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException('Unable to remove user unexpected error occurred');
    }
  }
}