import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { VideoService } from './video.service';
import { DbService } from '../../core/db/db.service';
import { CreateVideoDto } from './create-video.dto';
import { ThumbType, Video, Thumb } from '@prisma/client';
import { SocketGateway } from '../../core/socket/socket.gateway';

describe('VideoService', () => {
  let service: VideoService;
  let dbServiceMock: DbService;
  let socketGatewayMock: SocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: DbService,
          useValue: {
            video: {
              count: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              findUnique: jest.fn(),
            },
            thumb: {
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: SocketGateway,
          useValue: {
            shareVideo: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
    dbServiceMock = module.get<DbService>(DbService);
    socketGatewayMock = module.get<SocketGateway>(SocketGateway);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should return paginated video data', async () => {
      const page = 0;
      const pageSize = 10;
      const totalVideos = 20;
      const totalPages = 2;
      const previousPage = null;
      const nextPage = 1;
      const videos: (Video & {
        thumbs: Thumb[];
        author: { id: number; email: string };
      })[] = [
        // Mock video data
      ];

      jest.spyOn(dbServiceMock.video, 'count').mockResolvedValue(totalVideos);
      jest.spyOn(dbServiceMock.video, 'findMany').mockResolvedValue(videos);

      const result = await service.find(page, pageSize);

      expect(dbServiceMock.video.count).toHaveBeenCalled();
      expect(dbServiceMock.video.findMany).toHaveBeenCalledWith({
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
      expect(result).toEqual({
        data: videos,
        previousPage,
        nextPage,
        totalPages,
      });
    });
  });

  describe('create', () => {
    it('should create a new video and share it via socket gateway', async () => {
      const userId = 1;
      const payload = {
        // Mock payload
      } as unknown as CreateVideoDto;
      const createdVideo = {
        // Mock created video
      } as unknown as Video & { author: { id: number; email: string } };

      jest.spyOn(dbServiceMock.video, 'create').mockResolvedValue(createdVideo);
      jest.spyOn(socketGatewayMock, 'shareVideo').mockImplementation();

      const result = await service.create(userId, payload);

      expect(dbServiceMock.video.create).toHaveBeenCalledWith({
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
      expect(socketGatewayMock.shareVideo).toHaveBeenCalledWith(createdVideo);
      expect(result).toEqual(createdVideo);
    });
  });

  describe('thumb', () => {
    const userId = 1;
    const videoId = 1;
    const type: ThumbType = ThumbType.UP;

    beforeEach(() => {
      jest
        .spyOn(dbServiceMock.video, 'findUnique')
        .mockResolvedValue({} as Video);
    });

    it('should return a HttpException if the video id is not a number', async () => {
      jest.spyOn(dbServiceMock.video, 'findUnique').mockResolvedValue(null);

      const result = await service.thumb(userId, videoId, type);

      expect(result).toBeInstanceOf(HttpException);
      expect((result as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect((result as HttpException).getResponse()).toEqual(
        'Video not found',
      );
      expect(dbServiceMock.thumb.create).not.toHaveBeenCalled();
      expect(dbServiceMock.thumb.update).not.toHaveBeenCalled();
    });

    it('should return a HttpException if the thumb type is invalid', async () => {
      const invalidType = 'invalid' as ThumbType;

      const result = await service.thumb(userId, videoId, invalidType);

      expect(result).toBeInstanceOf(HttpException);
      expect((result as HttpException).getStatus()).toBe(
        HttpStatus.BAD_REQUEST,
      );
      expect((result as HttpException).getResponse()).toEqual(
        'Thumb type must be up or down',
      );
      expect(dbServiceMock.thumb.create).not.toHaveBeenCalled();
      expect(dbServiceMock.thumb.update).not.toHaveBeenCalled();
    });

    it('should return a HttpException if the video is not found', async () => {
      jest.spyOn(dbServiceMock.video, 'findUnique').mockResolvedValue(null);

      const result = await service.thumb(userId, videoId, type);

      expect(result).toBeInstanceOf(HttpException);
      expect((result as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
      expect((result as HttpException).getResponse()).toEqual(
        'Video not found',
      );
      expect(dbServiceMock.thumb.create).not.toHaveBeenCalled();
      expect(dbServiceMock.thumb.update).not.toHaveBeenCalled();
    });

    it('should create a new thumb if the user has not thumb-rated the video', async () => {
      jest.spyOn(dbServiceMock.thumb, 'create').mockResolvedValue({} as Thumb);

      const result = await service.thumb(userId, videoId, type);

      expect(dbServiceMock.thumb.create).toHaveBeenCalledWith({
        data: {
          type,
          authorId: userId,
          videoId,
        },
      });
      expect(dbServiceMock.thumb.update).not.toHaveBeenCalled();
      expect(result).toEqual({});
    });

    it('should update the thumb if the user has thumb-rated the video', async () => {
      const thumb = {
        // Mock thumb data
      } as unknown as Thumb;
      const video = {
        thumbs: [{ id: 1, type: ThumbType.UP, authorId: userId, videoId }],
      } as unknown as Video & { thumbs: Thumb[] };

      jest.spyOn(dbServiceMock.video, 'findUnique').mockResolvedValue(video);
      jest.spyOn(dbServiceMock.thumb, 'update').mockResolvedValue(thumb);

      const result = await service.thumb(userId, videoId, type);

      expect(dbServiceMock.thumb.create).not.toHaveBeenCalled();
      expect(dbServiceMock.thumb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: video.thumbs[0].id,
          },
          data: {
            type,
          },
        }),
      );
      expect(result).toEqual(thumb);
    });
  });
});
