import MockAdapter from 'axios-mock-adapter';

import axios from '@/plugins/axios';
import { ThumbType } from '@/types';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../test/utils/TestUtils';
import { VideoItem } from '../VideoItem';

const mockData = {
  id: 1,
  url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
  thumbs: [
    { authorId: 1, type: ThumbType.UP, id: 1, videoId: 1 },
    { authorId: 2, type: ThumbType.DOWN, id: 2, videoId: 1 },
  ],
  title: 'Test Video',
  author: { email: 'test@example.com', id: 1 },
  authorId: 1,
  description: 'This is a test video',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios.reset();
});

test('renders video item correctly', () => {
  const refetchPageMock = jest.fn();

  render(<VideoItem data={mockData} refetchPage={refetchPageMock} />);

  const videoElement = screen.getByTestId('video');
  expect(videoElement).toBeInTheDocument();
  expect(videoElement.getAttribute('src')).toContain('youtube.com/embed');

  const titleElement = screen.getByText('Test Video');
  const authorElement = screen.getByText('Shared by: test@example.com');
  const thumbsUpButton = screen.getByTestId('thumb-up-button');
  const thumbsDownButton = screen.getByTestId('thumb-down-button');
  const descriptionElement = screen.getByText('This is a test video');

  expect(titleElement).toBeInTheDocument();
  expect(authorElement).toBeInTheDocument();
  expect(thumbsUpButton).toBeInTheDocument();
  expect(thumbsDownButton).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('handles thumb up button click correctly', async () => {
  const refetchPageMock = jest.fn();
  render(<VideoItem data={mockData} refetchPage={refetchPageMock} />);

  mockAxios.onAny('/video/1/UP').reply(200);

  const thumbsUpButton = screen.getByTestId('thumb-up-button');
  act(() => {
    fireEvent.click(thumbsUpButton);
  });

  await waitFor(() => {
    expect(refetchPageMock).toHaveBeenCalledTimes(1);
  });
});

test('handles thumb down button click correctly', async () => {
  const refetchPageMock = jest.fn();
  render(<VideoItem data={mockData} refetchPage={refetchPageMock} />);

  mockAxios.onAny('/video/1/DOWN').reply(200);

  const thumbsDownButton = screen.getByTestId('thumb-down-button');
  act(() => {
    fireEvent.click(thumbsDownButton);
  });

  await waitFor(() => {
    expect(refetchPageMock).toHaveBeenCalledTimes(1);
  });
});
