import axios from '@/plugins/axios';

import { SignIn } from '../auth';

jest.mock('@/plugins/axios');

describe('SignIn', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a POST request to /auth and return the response data', async () => {
    const expectedResponse = {
      accessToken: 'token',
      user: {
        id: 1,
        email: 'example@example.com',
      },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce({ data: expectedResponse });

    const payload = {
      email: 'test@example.com',
      password: 'password',
    };

    const result = await SignIn(payload);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/auth', payload);
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error if the request fails', async () => {
    const error = new Error('Request failed');

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    const payload = {
      email: 'test@example.com',
      password: 'password',
    };

    await expect(SignIn(payload)).rejects.toThrow(error);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/auth', payload);
  });
});
