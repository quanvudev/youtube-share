import { useAuthContext } from '@/hooks/useAuthContext';

import { act, fireEvent, render } from '../../test/utils/TestUtils';
import Banner from '../Banner';

jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  },
}));

jest.mock('@/hooks/useAuthContext');

describe('Banner', () => {
  const mockContext = {
    state: {
      video: {
        url: 'https://www.youtube.com/watch?v=VIDEO_ID',
        title: 'Video Title',
        author: { email: 'test@example.com' },
        description: 'Video Description',
      },
    },
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    (useAuthContext as jest.Mock).mockReturnValue(mockContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the banner when video is present in context', () => {
    const { getByText } = render(<Banner />);
    expect(getByText('Video Title')).toBeInTheDocument();
    expect(getByText('Shared by: test@example.com')).toBeInTheDocument();
    expect(getByText('Video Description')).toBeInTheDocument();
  });

  test('should close the banner after 5000ms', async () => {
    const { getByTestId } = render(<Banner />);
    const banner = getByTestId('banner');

    act(() => {
      fireEvent.mouseOver(banner);
    });
    expect(mockContext.dispatch).not.toHaveBeenCalled();

    act(() => {
      fireEvent.mouseLeave(banner);
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    expect(mockContext.dispatch).toHaveBeenCalled();
  }, 5500);
});
