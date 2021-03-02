import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
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
    type: User,
    status: 201,
    description: `Add one user instance and after it was created (added to the DB) 
    returns it`
  })
  @ApiResponse({
    status: 400,
    description: `If the request body does not match CreateUserDto 
    then the API will return 400 bad request`
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post('bulk')
  @ApiBody({ type: [CreateUserDto]})
  @ApiResponse({
    type: [User],
    status: 201,
    description: `Add multiple user instances and after they were created (added to the DB) 
    returns them`
  })
  @ApiResponse({
    status: 400,
    description: `If the request body does not match array of CreateUserDtos 
    then the API will return 400 bad request`
  })
  bulk(
    @Body(new ParseArrayPipe({ items: CreateUserDto }))
    createUserDtos: CreateUserDto[]
  ): Promise<User[]> {
    return this.usersService.bulk(createUserDtos);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    example: '55'
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    type: User,
    status: 200,
    description:
      'Update an existing user instance in the database and returns the user'
  })
  @ApiResponse({
    status: 400,
    description: `If the request body does not match UpdateUserDto or it's empty 
    then the API will return 400 bad request`
  })
  @ApiResponse({
    status: 404,
    description:
      'If you provide user id that does not exist API will return 404 NotFoundException'
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiQuery({
    type: FindUsersDto
  })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of users from the database by multiple parameters',
    type: [User]
  })
  @ApiResponse({
    status: 400,
    description: `If the query does not match FindUsersDto then the API will return 400 bad request`
  })
  @Get()
  find(@Query() findUsersDto: FindUsersDto): Promise<User[]> {
    return this.usersService.find(findUsersDto);
  }

  @Get('find/:id')
  @ApiParam({
    name: 'id',
    example: '99'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns one user from the database by id',
    type: User
  })
  @ApiResponse({
    status: 404,
    description:
      'If user with provided id does not exist API will return 404 NotFoundException'
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {   
    return this.usersService.findOne(id);
  }

  @Get('findAll')
  @ApiResponse({
    status: 200,
    description: `Returns an array of users from the database 
      or an empty array if there are no users`,
    type: [User]
  })
  findAll(@Query() paginationDto: PaginationDto): Promise<User[]> {
    return this.usersService.findAll(paginationDto);
  }
  
  @Delete(':id')
  @ApiParam({
    name: 'id',
    example: '63'
  })
  @ApiResponse({
    status: 200,
    description: 'Removes user from the database by id'
  })
  @ApiResponse({
    status: 404,
    description:
      'If user with provided id does not exist API will return 404 NotFoundException'
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
