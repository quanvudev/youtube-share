import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '@prisma/client';
import { DbService } from '../../core/db/db.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService, DbService],
    }).compile();

    service = module.get(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  describe('create', () => {
    const createAuthDto: CreateAuthDto = {
      email: 'test@example.com',
      password: '123456',
    };
    const user: User = {
      id: 1,
      email: 'test@example.com',
      password: '$argon2i$v=19$m=4096,t=3,p=1$c29tZXNhbHQ$cGhwX3Bhc3N3b3Jk',
      socketId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create an auth record', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(argon2, 'verify').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = await service.create(createAuthDto);

      expect(userService.findByEmail).toHaveBeenCalledWith(createAuthDto.email);
      expect(argon2.verify).toHaveBeenCalledWith(
        user.password,
        createAuthDto.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({ id: user.id });
      expect(result).toEqual({
        accessToken: 'token',
        user: {
          id: user.id,
          email: user.email,
          socketId: null,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    });

    it('should throw an HttpException if user does not exist', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      await expect(service.create(createAuthDto)).rejects.toThrowError(
        new HttpException("User doesn't exist", HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an UnauthorizedException if password is invalid', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      await expect(service.create(createAuthDto)).rejects.toThrowError(
        new UnauthorizedException('Invalid password'),
      );
    });
  });

  describe('findOne', () => {
    const userId = 1;
    const user = {
      id: userId,
      email: 'test@example.com',
    };

    it('should return the user if found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(user as User);

      const result = await service.findOne(userId);

      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it('should throw an UnauthorizedException if user is not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(userId)).rejects.toThrowError(
        new UnauthorizedException('Token is not valid'),
      );
    });
  });
});
