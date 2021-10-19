import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { promises } from 'dns';
import { User } from '../entities/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
