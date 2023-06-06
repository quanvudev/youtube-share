import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';

import { useAuthContext } from '@/hooks/useAuthContext';
import axios from '@/plugins/axios';

import { fireEvent, render, waitFor } from '../../test/utils/TestUtils';
import SharePage from '../share';

jest.mock('react-toastify');

jest.mock('@/hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(),
}));

describe('SharePage', () => {
  let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    (useAuthContext as jest.Mock).mockReturnValue({ isAuth: true });
  });

  afterEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
  });

  test('should render form inputs', () => {
    const { getByPlaceholderText } = render(<SharePage />);

    expect(getByPlaceholderText('Video Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Video Url')).toBeInTheDocument();
    expect(getByPlaceholderText('Video Description')).toBeInTheDocument();
  });

  test('should submit the form', async () => {
    const toastSuccessSpy = jest.spyOn(toast, 'success');

    axiosMock.onPost('/video').reply(200, { id: 1, title: 'Video Title' });

    const { getByPlaceholderText, getByText } = render(<SharePage />);

    const titleInput = getByPlaceholderText('Video Title') as HTMLInputElement;
    const urlInput = getByPlaceholderText('Video Url') as HTMLInputElement;
    const descriptionInput = getByPlaceholderText(
      'Video Description',
    ) as HTMLTextAreaElement;
    const shareButton = getByText('Share') as HTMLButtonElement;

    fireEvent.change(titleInput, { target: { value: 'Video Title' } });
    fireEvent.change(urlInput, {
      target: { value: 'https://youtu.be/7MKEOfSP2s4' },
    });
    fireEvent.change(descriptionInput, {
      target: { value: 'Video Description' },
    });

    fireEvent.click(shareButton);

    await waitFor(async () => {
      expect(axiosMock.history.post).toHaveLength(1);
      expect(axiosMock.history.post[0].data).toEqual(
        JSON.stringify({
          title: 'Video Title',
          url: 'https://youtu.be/7MKEOfSP2s4',
          description: 'Video Description',
        }),
      );
      expect(toastSuccessSpy).toHaveBeenCalledWith('Video shared');
    });
  });
});
