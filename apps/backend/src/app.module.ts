import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { VideoModule } from './modules/video/video.module';
import { SocketModule } from './core/socket/socket.module';

@Module({
  imports: [CoreModule, SocketModule, AuthModule, UserModule, VideoModule],
})
export class AppModule {}
