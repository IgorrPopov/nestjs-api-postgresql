import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
 
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);

    try {
      await user.save();
      return user;
    } catch (error) {
      console.log('Error');
    }
  }
}