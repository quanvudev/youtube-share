import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DbService } from '../../core/db/db.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, DbService, JwtService],
    }).compile();

    controller = module.get(AuthController);
    authService = module.get(AuthService);
  });

  describe('create', () => {
    it('should create an auth record', async () => {
      const createAuthDto: CreateAuthDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const createdAuth = {};

      jest.spyOn(authService, 'create').mockResolvedValue(createdAuth as any);

      const result = await controller.create(createAuthDto);

      expect(authService.create).toHaveBeenCalledWith(createAuthDto);
      expect(result).toBe(createdAuth);
    });
  });

  describe('findOne', () => {
    it('should find an auth record by user id', async () => {
      const userId = 1;
      const foundAuth = {};

      jest.spyOn(authService, 'findOne').mockResolvedValue(foundAuth as any);

      const result = await controller.findOne({ id: userId });

      expect(authService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toBe(foundAuth);
    });
  });
});
