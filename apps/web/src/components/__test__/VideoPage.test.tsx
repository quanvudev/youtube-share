import { render, screen } from '../../test/utils/TestUtils';
import VideoPage from '../VideoPage';

const mockVideos = [
  {
    id: 1,
    url: 'https://www.youtube.com/watch?v=vE3LOHU0OV8',
    thumbs: [],
    title: 'Test Video 1',
    author: { email: 'test@example.com', id: 1 },
    authorId: 1,
    description: 'This is test video 1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    url: 'https://www.youtube.com/watch?v=abc123',
    thumbs: [],
    title: 'Test Video 2',
    author: { email: 'test@example.com', id: 1 },
    authorId: 1,
    description: 'This is test video 2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockRefetchPage = jest.fn();

test('renders VideoPage component with video items', () => {
  render(<VideoPage videos={mockVideos} refetchPage={mockRefetchPage} />);

  const videoTitles = mockVideos.map((video) => video.title);
  for (const title of videoTitles) {
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  }

  expect(mockRefetchPage).toHaveBeenCalledTimes(0);
});
