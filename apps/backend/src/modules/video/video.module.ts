import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { UserService } from '../user/user.service';
import { SocketGateway } from '../../core/socket/socket.gateway';
import { SocketService } from '../../core/socket/socket.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService, UserService, SocketGateway, SocketService],
})
export class VideoModule {}
