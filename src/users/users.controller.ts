import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: `Add one user instance and after it was created (added to the DB) 
    returns void`
  })
  @ApiResponse({
    status: 400,
    description: `If the request body does not match CreateUserDto 
    then the API will return 400 bad request`
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // @Post('batch')
  // @ApiBody({ type: [CreateUserDto]})
  // @ApiResponse({
  //   status: 201,
  //   description: `Add multiple user instances and after they were created (added to the DB) 
  //   returns void`
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: `If the request body does not match array of CreateUserDtos 
  //   then the API will return 400 bad request`
  // })
  // batch(
  //   @Body(new ParseArrayPipe({ items: CreateUserDto }))
  //   createUserDtos: CreateUserDto[],
  // ): Promise<void> {
  //   return this.usersService.batch(createUserDtos);
  // }

  // @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   example: '5QujReZ4R2tHQNPwip66'
  // })
  // @ApiBody({ type: UpdateUserDto })
  // @ApiResponse({
  //   status: 200,
  //   description:
  //     'Update existing user instance in the database and return void'
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: `If the request body does not match UpdateUserDto or it's empty 
  //   then the API will return 400 bad request`
  // })
  // @ApiResponse({
  //   status: 404,
  //   description:
  //     'If you provide user id that does not exist API will return 404 NotFoundException'
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<void> {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @ApiQuery({
  //   type: FindUsersDto
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns an array of users from the database by multiple parameters',
  //   type: [User]
  // })
  // @ApiResponse({
  //   status: 404,
  //   description:
  //     'If you provide id in the query and the user with this id does not exist API will return 404 NotFoundException'
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: `If the query does not match FindUsersDto then the API will return 400 bad request`
  // })
  // @Get()
  // find(@Query() findUsersDto: FindUsersDto): Promise<User[]> {
  //   return this.usersService.find(findUsersDto);
  // }

  // @Get('find/:id')
  // @ApiParam({
  //   name: 'id',
  //   example: '5QujReZ4R2tHQNPwip66'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns one user from the database by his id',
  //   type: User
  // })
  // @ApiResponse({
  //   status: 404,
  //   description:
  //     'If user with provided id does not exist API will return 404 NotFoundException'
  // })
  // findOne(@Param('id') id: string): Promise<User> {   
  //   return this.usersService.findOne(id);
  // }

  // @Get('findAll')
  // @ApiResponse({
  //   status: 200,
  //   description: `Returns an array of users from the database 
  //     or an empty array if there are no users`,
  //   type: [User]
  // })
  // findAll(@Query() paginationDto: PaginationDto): Promise<User[]> {
  //   return this.usersService.findAll(paginationDto);
  // }
  
  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   example: '5QujReZ4R2tHQNPwip66'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Removes user from the database by his id'
  // })
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.usersService.remove(id);
  // }
}
