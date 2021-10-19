import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {JwtService} from "@nestjs/jwt";
import {JwtPayloadInterface} from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.creatUser(authCredentialsDto);
  }

  async signIn( authCredential: AuthCredentialsDto): Promise<{ accessToken: string}>{
    const { username, password} = authCredential ;
    const  user = await this.userRepository.findOne({ username });
    if (user && (user.password === password)) {
      const payload: JwtPayloadInterface = { username };
      const accessToken: string = await this.jwtService.sign(payload)
      return { accessToken };
    }else {
      throw new UnauthorizedException()
    }
  }

}
