import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    //
  }
  async create(createAuthDto: CreateAuthDto) {
    const user = await this.userService.findByEmail(createAuthDto.email);

    if (!user) return new HttpException("User doesn't exist", 404);
    const isValid = await argon2.verify(user.password, createAuthDto.password);

    if (!isValid)
      return new UnauthorizedException({ message: 'Invalid password' });

    delete user.password;
    const accessToken = this.jwtService.sign({ id: user.id });
    return new HttpException({ accessToken, user }, HttpStatus.OK);
  }

  async findOne(id: number) {
    const user = await this.userService.findOne(id);
    if (!user)
      return new UnauthorizedException({ message: 'Token is not valid' });
    return user;
  }
}
