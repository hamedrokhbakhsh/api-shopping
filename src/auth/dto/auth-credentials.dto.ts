import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class AuthCredentialsDto {

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  username: string;


  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
