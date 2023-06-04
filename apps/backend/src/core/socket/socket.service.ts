import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../modules/user/user.service';
import { Server, Socket } from 'socket.io';
import { Video } from '@prisma/client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { WebSocketServer } from '@nestjs/websockets';

@Injectable()
export class SocketService {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    //
  }
  async handleConnect(token: string, client: Socket) {
    const user = this.jwtService.verify<{ id: number }>(token);
    await this.userService.addSocketId(user.id, client.id);
  }

  async handleLogout(client: Socket) {
    await this.userService.removeSocketId(client.id);
  }

  shareVideo(
    video: Video,
    server?: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    if (!server) server = this.server;
    const result = server.to(['PUBLIC']).emit('new_video', video);
    console.log(result);
  }
}
