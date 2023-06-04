import { useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { getVideos } from '@/services/video';

import VideoPage from './VideoPage';

export default function VideoList() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    'videos',
    async ({ pageParam: cursor = 0 }) => {
      return getVideos(cursor);
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousPage ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    },
  );

  const handleRefetchPage = (pageIndex: number) => () => {
    refetch({ refetchPage: (_, index) => index === pageIndex });
  };

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <div className="flex w-full max-w-screen-sm flex-col gap-y-4">
      {data?.pages.map((page, index) => (
        <VideoPage
          refetchPage={handleRefetchPage(index)}
          videos={page.data}
          key={index}
        />
      ))}
      {hasNextPage && (
        <button
          className="w-full"
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isLoading && <AiOutlineLoading className="mx-auto animate-spin" />}
        </button>
      )}
    </div>
  );
}
