import axios from '@/plugins/axios';
import { Thumb, ThumbType, Video, VideoDTO } from '@/types';

export function createVideo(payload: VideoDTO) {
  return axios.post<Video>('/video', payload).then((response) => response.data);
}

export function getVideos(cursor = 0) {
  return axios
    .get<{
      data: Video[];
      previousPage: number;
      nextPage: number;
    }>('/video' + '?cursor=' + cursor)
    .then((response) => response.data);
}

export function voteVideo(videoId: number, type: ThumbType) {
  return axios
    .patch<Thumb>('/video/' + videoId + '/' + type)
    .then((response) => response.data);
}
