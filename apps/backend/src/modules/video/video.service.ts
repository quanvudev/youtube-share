import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../../core/db/db.service';
import { CreateVideoDto } from './create-video.dto';
import { ThumbType } from '@prisma/client';
import { SocketGateway } from '../../core/socket/socket.gateway';

@Injectable()
export class VideoService {
  constructor(
    private readonly dbService: DbService,
    private readonly socketGateway: SocketGateway,
  ) {
    //
  }

  async find(page = 0, pageSize = 10) {
    const totalVideos = await this.dbService.video.count();
    const totalPages = Math.ceil(totalVideos / pageSize);

    const previousPage = page > 0 ? page - 1 : null;
    const nextPage =
      page < totalPages ? (page < totalPages - 1 ? page + 1 : null) : null;

    console.log(totalVideos, page, totalPages, previousPage, nextPage);

    const data = await this.dbService.video.findMany({
      skip: page * pageSize,
      take: pageSize,
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
        thumbs: {
          select: {
            id: true,
            type: true,
            authorId: true,
            videoId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return {
      data,
      previousPage,
      nextPage,
      totalPages,
    };
  }

  async create(userId: number, payload: CreateVideoDto) {
    const video = await this.dbService.video.create({
      data: {
        ...payload,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    this.socketGateway.shareVideo(video);
    return video;
  }

  async thumb(userId: number, id: number, type: ThumbType) {
    if (Number.isNaN(+id))
      return new HttpException(
        'Video id must be a number',
        HttpStatus.BAD_REQUEST,
      );
    if (!Object.values(ThumbType).includes(type))
      return new HttpException(
        'Thumb type must be up or down',
        HttpStatus.BAD_REQUEST,
      );

    const video = await this.dbService.video.findUnique({
      where: {
        id,
      },
      include: {
        thumbs: {
          select: {
            id: true,
            type: true,
            authorId: true,
            videoId: true,
          },
        },
      },
    });
    if (!video)
      return new HttpException('Video not found', HttpStatus.NOT_FOUND);
    const thumb = video.thumbs.find((thumb) => thumb.authorId === userId);
    if (!thumb) {
      return this.dbService.thumb.create({
        data: {
          type,
          authorId: userId,
          videoId: id,
        },
      });
    }
    return this.dbService.thumb.update({
      where: {
        id: thumb.id,
      },
      data: {
        type,
      },
    });
  }
}
