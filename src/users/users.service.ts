import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { collectionName, defaultUserStatus } from './constants/user.const';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto): Promise<User> {

    if (!createUserDto.status) {
      createUserDto.status = defaultUserStatus;
    }

    return this.userRepository.createUser(createUserDto);
  }

  // batch(createUserDtos: CreateUserDto[]): Promise<void> {
  //   return;
  //   // return this.firestoreClientService.batch(
  //   //   collectionName, 
  //   //   createUserDtos.map(createUserDto => {
  //   //     if (!createUserDto.status) {
  //   //       createUserDto.status = defaultUserStatus;
  //   //     }
  //   //     return createUserDto;
  //   //   })
  //   // );
  // }

  // update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
  //   return;
  //   // return this.firestoreClientService.update(collectionName, id, updateUserDto);
  // }

  // findAll(paginationDto: PaginationDto): Promise<User[]> {
  //   const user = new User();
  //   return [user]
  //   // return this.firestoreClientService.findAll(collectionName, paginationDto);
  // }

  // find(findUsersDto: FindUsersDto): Promise<User[]> {
  //   return this.firestoreClientService.find(collectionName, findUsersDto);
  // }

  // findOne(id: string): Promise<User> {
  //   return this.firestoreClientService.findOne(collectionName, id);
  // }

  // remove(id: string): Promise<void> {
  //   return ;
  //   // return this.firestoreClientService.remove(collectionName, id);
  // }
}
