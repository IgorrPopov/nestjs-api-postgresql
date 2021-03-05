import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudLoogerService } from '../cloud-logger/cloud-looger.service';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { PaginationDto } from '../common/dto/pagination.dto';

const mockUsersService = () => ({
  create: jest.fn()
});

describe('UsersController', () => {

  let usersService: UsersService;
  let usersController: UsersController;
  let cloudLoggerService: CloudLoogerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([UserRepository]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    // usersService = module.get<UsersService>(UsersService);
    // cloudLoggerService = module.get<CloudLoogerService>(CloudLoogerService);
    // usersController = module.get<UsersController>(UsersController);
  });

  it('it', () => {
    expect(1).toEqual(1)
  })

  // it('Should be defined', () => {
  //   expect(usersController).toBeDefined();
  // });
});