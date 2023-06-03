import { useMemo } from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { getVideoId } from '@/helper/youtubeUrl';
import { useAuthContext } from '@/hooks/useAuthContext';
import { voteVideo } from '@/services/video';
import { ThumbType, Video } from '@/types';

export function VideoItem({
  data,
  refetchPage,
}: {
  data: Video;
  refetchPage: () => void;
}) {
  const video = useMemo(() => {
    const videoId = getVideoId(data.url);
    return `https://www.youtube.com/embed/${videoId}`;
  }, [data.url]);

  const context = useAuthContext();

  const thumbsUp = useMemo(() => {
    return data.thumbs.filter((thumb) => thumb.type === ThumbType.UP).length;
  }, [data.thumbs]);

  const thumbsDown = useMemo(() => {
    return data.thumbs.filter((thumb) => thumb.type === ThumbType.DOWN).length;
  }, [data.thumbs]);

  const isVoted = useMemo(
    () =>
      data.thumbs.find((thumb) => thumb.authorId === context.state.user?.id),
    [context.state.user?.id, data.thumbs],
  );

  const { mutate, isLoading } = useMutation(
    (type: ThumbType) => voteVideo(data.id, type),
    {
      onSuccess: () => {
        refetchPage();
      },
      onError: (error_: { response: { status: number } }) => {
        let message = 'Something went wrong';
        if (error_.response.status === 401) {
          message = 'You need to login to vote';
        }
        toast.error(message);
      },
    },
  );

  const handleThumbUp = () => {
    mutate(ThumbType.UP);
  };

  const handleThumbDown = () => {
    mutate(ThumbType.DOWN);
  };

  return (
    <div className="flex w-full gap-x-4 rounded border bg-white p-4 shadow-lg">
      <div className="flex flex-1 overflow-hidden rounded">
        <iframe src={video} />
      </div>
      <div className="flex flex-1">
        <article className="flex flex-col gap-y-2">
          <h2 className="text-lg font-bold">{data.title}</h2>
          <h2 className="font-semibold">Shared by: {data.author.email}</h2>
          <div className="flex w-full items-center gap-x-4">
            <button
              className="flex items-center gap-x-2"
              onClick={handleThumbUp}
              disabled={isLoading}
            >
              {thumbsUp} {isVoted ? <FaThumbsUp /> : <FiThumbsUp />}
            </button>
            <button
              className="flex items-center gap-x-2"
              onClick={handleThumbDown}
              disabled={isLoading}
            >
              {thumbsDown} {isVoted ? <FaThumbsDown /> : <FiThumbsDown />}
            </button>
          </div>
          <p className="text-sm">{data.description}</p>
        </article>
      </div>
    </div>
  );
}
