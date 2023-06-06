import axios from '@/plugins/axios';
import { ThumbType, VideoDTO } from '@/types';

import { createVideo, getVideos, voteVideo } from '../video';

jest.mock('@/plugins/axios');
const payload: VideoDTO = {
  title: 'Video Title',
  description: 'Video Description',
  url: 'https://www.youtube.com/watch?v=123456',
};

describe('createVideo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a POST request to /video and return the response data', async () => {
    const expectedResponse = {
      id: 1,
      title: 'Video Title',
      description: 'Video Description',
    };

    (axios.post as jest.Mock).mockResolvedValueOnce({ data: expectedResponse });

    const result = await createVideo(payload);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/video', payload);
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error if the request fails', async () => {
    const error = new Error('Request failed');

    (axios.post as jest.Mock).mockRejectedValueOnce(error);

    await expect(createVideo(payload)).rejects.toThrow(error);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/video', payload);
  });
});

describe('getVideos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request to /video and return the response data', async () => {
    const expectedResponse = {
      data: [
        {
          id: 1,
          title: 'Video 1',
        },
        {
          id: 2,
          title: 'Video 2',
        },
      ],
      previousPage: 0,
      nextPage: 2,
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: expectedResponse });

    const cursor = 0;

    const result = await getVideos(cursor);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/video?cursor=' + cursor);
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error if the request fails', async () => {
    const error = new Error('Request failed');

    (axios.get as jest.Mock).mockRejectedValueOnce(error);

    const cursor = 0;

    await expect(getVideos(cursor)).rejects.toThrow(error);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/video?cursor=' + cursor);
  });
});

describe('voteVideo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a PATCH request to /video/{videoId}/{type} and return the response data', async () => {
    const expectedResponse = {
      thumbType: ThumbType.UP,
      count: 10,
    };

    (axios.patch as jest.Mock).mockResolvedValueOnce({
      data: expectedResponse,
    });

    const videoId = 1;
    const type = ThumbType.UP;

    const result = await voteVideo(videoId, type);

    expect(axios.patch).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledWith('/video/' + videoId + '/' + type);
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error if the request fails', async () => {
    const error = new Error('Request failed');

    (axios.patch as jest.Mock).mockRejectedValueOnce(error);

    const videoId = 1;
    const type = ThumbType.UP;

    await expect(voteVideo(videoId, type)).rejects.toThrow(error);
    expect(axios.patch).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledWith('/video/' + videoId + '/' + type);
  });
});
