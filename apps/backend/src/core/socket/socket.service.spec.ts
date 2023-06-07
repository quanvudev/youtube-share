import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../modules/user/user.service';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';

describe('SocketService', () => {
  let socketService: SocketService;
  let jwtService: JwtService;
  let userService: UserService;
  let server: Server;

  const video = {
    id: 1,
    title: 'Test Video',
    authorId: 1,
    url: 'https://example.com',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jwtService = new JwtService({});
    userService = new UserService(undefined);
    server = new Server();
    socketService = new SocketService(jwtService, userService);
    (socketService as any).server = server;
  });

  describe('handleConnect', () => {
    it('should add socket ID to user', async () => {
      const token = 'mock-token';
      const client: any = { id: 'mock-socket-id' };

      jest.spyOn(jwtService, 'verify').mockReturnValue({ id: 1 });
      jest.spyOn(userService, 'addSocketId').mockResolvedValue(undefined);

      await socketService.handleConnect(token, client);

      expect(jwtService.verify).toHaveBeenCalledWith(token);
      expect(userService.addSocketId).toHaveBeenCalledWith(1, client.id);
    });
  });

  describe('handleLogout', () => {
    it('should remove socket ID from user', async () => {
      const client: any = { id: 'mock-socket-id' };

      jest.spyOn(userService, 'removeSocketId').mockResolvedValue(undefined);

      await socketService.handleLogout(client);

      expect(userService.removeSocketId).toHaveBeenCalledWith(client.id);
    });
  });

  describe('shareVideo', () => {
    it('should emit new_video event to server', () => {
      const toSpy = jest.spyOn(server, 'to').mockReturnThis();
      const emitSpy = jest.spyOn(server, 'emit');

      socketService.shareVideo(video);

      expect(toSpy).toHaveBeenCalledWith(['PUBLIC']);
      expect(emitSpy).toHaveBeenCalledWith('new_video', video);
    });

    it('should use provided server if available', () => {
      const customServer = new Server();
      const toSpy = jest.spyOn(customServer, 'to').mockReturnThis();
      const emitSpy = jest.spyOn(customServer, 'emit');

      socketService.shareVideo(video, customServer);

      expect(toSpy).toHaveBeenCalledWith(['PUBLIC']);
      expect(emitSpy).toHaveBeenCalledWith('new_video', video);
    });
  });
});
