import { Server, Socket } from 'socket.io';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { instance, mock, verify } from 'ts-mockito';
import { Video } from '@prisma/client';

describe('SocketGateway', () => {
  let socketGateway: SocketGateway;
  let socketService: SocketService;
  let server: Server;
  let client: Socket;

  beforeEach(() => {
    socketService = mock(SocketService);
    server = mock(Server);
    client = mock(Socket);

    socketGateway = new SocketGateway(instance(socketService));
    (socketGateway as any).server = instance(server);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleConnection', () => {
    it('should make the client join the "PUBLIC" room', () => {
      socketGateway.handleConnection(instance(client));

      verify(client.join('PUBLIC')).once();
    });
  });

  describe('disconnect', () => {
    it('should make the client leave the "PUBLIC" room', () => {
      socketGateway.disconnect(instance(client));

      verify(client.leave('PUBLIC')).once();
    });
  });

  describe('login', () => {
    it('should call the handleConnect method of the SocketService', () => {
      const token = 'mock-token';

      socketGateway.login(instance(client), token);

      verify(socketService.handleConnect(token, instance(client))).once();
    });
  });

  describe('logout', () => {
    it('should call the handleLogout method of the SocketService', () => {
      socketGateway.logout(instance(client));

      verify(socketService.handleLogout(instance(client))).once();
    });
  });

  describe('shareVideo', () => {
    it('should call the shareVideo method of the SocketService with the provided video and server', () => {
      const video: Video = {
        id: 1,
        title: 'Test Video',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Test Description',
        url: 'https://www.youtube.com/watch?v=1',
      };

      socketGateway.shareVideo(video);

      verify(socketService.shareVideo(video, instance(server))).once();
    });
  });
});
