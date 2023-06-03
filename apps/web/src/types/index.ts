export enum ThumbType {
  UP = 'UP',
  DOWN = 'DOWN',
}

export type Thumb = {
  id: number;
  authorId: number;
  videoId: number;
  type: ThumbType;
  createdAt: string;
  updatedAt: string;
};

export type Video = {
  id: number;
  authorId: number;
  author: {
    id: number;
    email: string;
  };
  title: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  thumbs: {
    id: number;
    type: ThumbType;
    authorId: number;
    videoId: number;
  }[];
};

export type VideoDTO = Pick<Video, 'title' | 'description' | 'url'>;
