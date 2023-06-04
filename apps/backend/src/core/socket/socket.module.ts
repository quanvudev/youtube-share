import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { UserService } from '../../modules/user/user.service';

@Module({
  providers: [SocketGateway, SocketService, UserService],
})
export class SocketModule {}
