import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { Video } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly socketService: SocketService) {
    //
  }

  @SubscribeMessage('connected')
  handleConnection(client: Socket) {
    client.join(['PUBLIC']);
  }

  @SubscribeMessage('disconnect')
  disconnect(client: Socket) {
    client.leave('PUBLIC');
  }

  @SubscribeMessage('socket_login')
  login(client: Socket, token: string) {
    return this.socketService.handleConnect(token, client);
  }

  @SubscribeMessage('socket_logout')
  logout(client: Socket) {
    return this.socketService.handleLogout(client);
  }

  shareVideo(video: Video) {
    this.socketService.shareVideo(video, this.server);
  }
}
