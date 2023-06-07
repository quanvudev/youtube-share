import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DbService } from '../../core/db/db.service';
import { User } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let dbService: DbService;
  let userId: number;
  let user: User;
  const socketId = 'socket123';

  beforeAll(async () => {
    userId = 1;
    user = {
      id: userId,
      email: 'test@example.com',
      password: 'password',
      socketId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DbService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              update: jest.fn(),
              updateMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    dbService = module.get<DbService>(DbService);

    jest
      .spyOn(dbService.user, 'findUnique')
      .mockResolvedValueOnce(user as User)
      .mockResolvedValueOnce(null);

    jest.spyOn(dbService.user, 'update').mockResolvedValue(user as User);

    jest.spyOn(dbService.user, 'updateMany').mockResolvedValue({ count: 1 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return the user if found', async () => {
      const result = await service.findOne(userId);

      expect(dbService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      const result = await service.findOne(userId);

      expect(dbService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return the user if found', async () => {
      const email = user.email;

      await service.findByEmail(email);

      expect(dbService.user.findUnique).toHaveBeenCalledWith({
        where: { email: email },
      });
    });

    it('should return null if user is not found', async () => {
      const email = 'nonexistent@example.com';
      await service.findByEmail(email);

      expect(dbService.user.findUnique).toHaveBeenCalledWith({
        where: { email: email },
      });
    });
  });

  describe('addSocketId', () => {
    it('should update the user with the socket ID', async () => {
      const result = await service.addSocketId(userId, socketId);

      expect(dbService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { socketId: socketId },
      });
      expect(result).toEqual(user);
    });
  });

  describe('removeSocketId', () => {
    it('should update the user with null socket ID', async () => {
      const result = await service.removeSocketId(socketId);

      expect(dbService.user.updateMany).toHaveBeenCalledWith({
        where: { socketId: socketId },
        data: { socketId: null },
      });
      expect(result).toEqual({ count: 1 });
    });
  });
});
