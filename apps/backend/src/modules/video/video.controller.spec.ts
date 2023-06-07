import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Thumb, ThumbType, Video } from '@prisma/client';
import { DbService } from '../../core/db/db.service';
import { SocketGateway } from '../../core/socket/socket.gateway';
import { SocketService } from '../../core/socket/socket.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('VideoController', () => {
  let controller: VideoController;
  let videoService: VideoService;
  let videoServiceMock: jest.Mocked<VideoService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [
        VideoService,
        DbService,
        SocketGateway,
        SocketService,
        JwtService,
        UserService,
      ],
    }).compile();

    controller = module.get<VideoController>(VideoController);
    videoService = module.get<VideoService>(VideoService);
    videoServiceMock = videoService as jest.Mocked<VideoService>;
  });

  describe('find', () => {
    const cursor = 0;
    const pageSize = 10;
    const videos: (Video & {
      thumbs: {
        id: number;
        authorId: number;
        type: ThumbType;
        videoId: number;
      }[];
      author: {
        id: number;
        email: string;
      };
    })[] = [
      // Videos data
    ];

    it('should return the videos', async () => {
      jest.spyOn(videoServiceMock, 'find').mockResolvedValue({
        data: videos,
        previousPage: 0,
        nextPage: 0,
        totalPages: 1,
      });

      const result = await controller.find(cursor, pageSize);

      expect(videoServiceMock.find).toHaveBeenCalledWith(cursor, pageSize);
      expect(result).toEqual({
        data: videos,
        previousPage: 0,
        nextPage: 0,
        totalPages: 1,
      });
    });
  });

  describe('create', () => {
    const user = { id: 1 };
    const createVideoDto = {
      title: 'New Video',
      url: 'https://example.com/new-video',
      description: 'A new video',
    };
    const createdVideo: Video & { author: { id: number; email: string } } = {
      author: {
        id: user.id,
        email: 'dev@test.debv',
      },
      authorId: user.id,
      createdAt: new Date(),
      description: createVideoDto.description,
      id: 1,
      title: createVideoDto.title,
      updatedAt: new Date(),
      url: createVideoDto.url,
    };

    it('should create a new video', async () => {
      jest.spyOn(videoServiceMock, 'create').mockResolvedValue(createdVideo);

      const result = await controller.create(user, createVideoDto);

      expect(videoServiceMock.create).toHaveBeenCalledWith(
        user.id,
        createVideoDto,
      );
      expect(result).toEqual(createdVideo);
    });
  });

  describe('thumb', () => {
    const user = { id: 1 };
    const videoId = '1';
    const type: ThumbType = ThumbType.UP;
    const updatedThumb: Thumb = {
      // Updated thumb data
      authorId: user.id,
      type,
      videoId: +videoId,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 1,
    };

    it('should update the thumb of the video', async () => {
      jest.spyOn(videoServiceMock, 'thumb').mockResolvedValue(updatedThumb);

      const result = await controller.thumb(user, videoId, type);

      expect(videoServiceMock.thumb).toHaveBeenCalledWith(
        user.id,
        +videoId,
        type,
      );
      expect(result).toEqual(updatedThumb);
    });
  });
});
