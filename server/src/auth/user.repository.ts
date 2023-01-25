import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
    try {
      const { password } = authSignUpDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.create({
        ...authSignUpDto,
        password: hashedPassword,
      });
      await this.save(user);
    } catch (error) {
      //duplicate email
      if (error.code === '23505') {
        throw new ConflictException('Username with such Email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.findOneBy({ email });
  }
}
