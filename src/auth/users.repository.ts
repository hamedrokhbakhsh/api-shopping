import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/User';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async creatUser(authCredentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;
    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (err) {
      if (err.errno === 1062) {
        throw new ConflictException('duplicate username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }



}
