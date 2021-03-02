import { BadRequestException, Injectable } from '@nestjs/common';
import { maxLimit } from 'src/common/constants/common.const';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto): Promise<User> {
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
}
