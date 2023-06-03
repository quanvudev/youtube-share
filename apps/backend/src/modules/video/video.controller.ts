import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser, Public } from '../../commons/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { CreateVideoDto } from './create-video.dto';
import { ThumbType } from '@prisma/client';

@Controller('video')
@ApiTags('Video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {
    //
  }
  @Get()
  @Public()
  find(@Param('cursor') cursor = 0, @Param('pageSize') pageSize = 10) {
    return this.videoService.find(cursor, pageSize);
  }

  @Post()
  @ApiBearerAuth()
  create(@CurrentUser() user: { id: number }, @Body() payload: CreateVideoDto) {
    return this.videoService.create(user.id, payload);
  }

  @Patch(':id/:type')
  @ApiBearerAuth()
  thumb(
    @CurrentUser() user: { id: number },
    @Param('id') videoId: string,
    @Param('type') type: ThumbType,
  ) {
    return this.videoService.thumb(user.id, +videoId, type);
  }
}
