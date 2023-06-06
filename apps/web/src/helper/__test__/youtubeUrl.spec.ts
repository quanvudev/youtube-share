import { getVideoId, isValidUrl } from '../youtubeUrl';

describe('isValidUrl', () => {
  it('should return true for valid YouTube URLs', () => {
    const validUrls = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ];

    for (const url of validUrls) {
      expect(isValidUrl(url)).toBe(true);
    }
  });

  it('should return false for invalid YouTube URLs', () => {
    const invalidUrls = [
      'https://www.youtube.com',
      'https://www.youtube.com/watch?invalid_param=dQw4w9WgXcQ',
      'https://www.youtube.com/embed/',
    ];

    for (const url of invalidUrls) {
      expect(isValidUrl(url)).toBe(false);
    }
  });
});

describe('getVideoId', () => {
  it('should return the correct video ID from a valid YouTube URL', () => {
    const validUrls = [
      {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        expectedId: 'dQw4w9WgXcQ',
      },
      {
        url: 'https://youtu.be/dQw4w9WgXcQ',
        expectedId: 'dQw4w9WgXcQ',
      },
      {
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        expectedId: 'dQw4w9WgXcQ',
      },
    ];

    for (const item of validUrls) {
      expect(getVideoId(item.url)).toBe(item.expectedId);
    }
  });

  it('should return an empty string for invalid YouTube URLs', () => {
    const invalidUrls = [
      'https://www.youtube.com',
      'https://www.youtube.com/watch?invalid_param=dQw4w9WgXcQ',
      'https://www.youtube.com/embed/',
    ];

    for (const url of invalidUrls) {
      expect(getVideoId(url)).toBe('');
    }
  });
});
