/* eslint-disable unicorn/no-array-for-each */
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { ThumbType } from '@/types';

import { fireEvent, render, screen } from '../../test/utils/TestUtils';
import VideoList from '../VideoList';

jest.mock('react-intersection-observer', () => {
  const originalModule = jest.requireActual('react-intersection-observer');
  const mockUseInView = jest.fn();

  return {
    ...originalModule,
    useInView: mockUseInView,
  };
});

jest.mock('react-query', () => {
  const originalModule = jest.requireActual('react-query');
  const mockUseInfiniteQuery = jest.fn();

  return {
    ...originalModule,
    useInfiniteQuery: mockUseInfiniteQuery,
  };
});

const mockData = {
  data: {
    pages: [
      {
        data: [
          {
            id: 1,
            url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
            thumbs: [
              { authorId: 1, type: ThumbType.UP, id: 1, videoId: 1 },
              { authorId: 2, type: ThumbType.DOWN, id: 2, videoId: 1 },
            ],
            title: 'Test Video 1',
            author: { email: 'test@example.com', id: 1 },
            authorId: 1,
            description: 'This is a test video',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 2,
            url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
            thumbs: [
              { authorId: 1, type: ThumbType.UP, id: 1, videoId: 2 },
              { authorId: 2, type: ThumbType.DOWN, id: 2, videoId: 2 },
            ],
            title: 'Test Video 2',
            author: { email: 'test@example.com', id: 1 },
            authorId: 1,
            description: 'This is a test video',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
      {
        data: [
          {
            id: 3,
            url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
            thumbs: [
              { authorId: 1, type: ThumbType.UP, id: 1, videoId: 1 },
              { authorId: 2, type: ThumbType.DOWN, id: 2, videoId: 1 },
            ],
            title: 'Test Video 3',
            author: { email: 'test@example.com', id: 1 },
            authorId: 1,
            description: 'This is a test video',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 4,
            url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
            thumbs: [
              { authorId: 1, type: ThumbType.UP, id: 1, videoId: 2 },
              { authorId: 2, type: ThumbType.DOWN, id: 2, videoId: 2 },
            ],
            title: 'Test Video 4',
            author: { email: 'test@example.com', id: 1 },
            authorId: 1,
            description: 'This is a test video',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
    ],
    hasNextPage: true,
    isLoading: false,
    isFetchingNextPage: false,
    refetch: jest.fn(),
    fetchNextPage: jest.fn(),
  },
  fetchNextPage: jest.fn(),
  hasNextPage: true,
  isLoading: false,
  isFetchingNextPage: false,
  refetch: jest.fn(),
};

(useInView as jest.Mock).mockImplementation(() => ({
  ref: jest.fn(),
  inView: true,
}));

(useInfiniteQuery as jest.Mock).mockReturnValue(mockData);

test('renders VideoList component with video pages and load more button', () => {
  render(<VideoList />);

  mockData.data?.pages.forEach((page: any) => {
    page.data.forEach((video: any) => {
      const videoTitle = screen.getByText(video.title);
      expect(videoTitle).toBeInTheDocument();
    });
  });

  const loadMoreButton = screen.getByTestId('load-more-button');
  expect(loadMoreButton).toBeInTheDocument();
  expect(loadMoreButton).toBeEnabled();

  fireEvent.click(loadMoreButton);

  expect(mockData.fetchNextPage).toHaveBeenCalled();
});
