import { Video } from '@/types';

import { VideoItem } from './VideoItem';

export default function VideoPage({
  videos,
  refetchPage,
}: {
  videos: Video[];
  refetchPage: () => void;
}) {
  return (
    <>
      {videos.map((video) => (
        <VideoItem key={video.id} data={video} refetchPage={refetchPage} />
      ))}
    </>
  );
}
