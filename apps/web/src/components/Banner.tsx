import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import Timer from '@/helper/time';
import { getVideoId } from '@/helper/youtubeUrl';
import { useAuthContext } from '@/hooks/useAuthContext';
import { AuthAction } from '@/providers/AuthProvider';

export default function Banner() {
  const context = useAuthContext();

  const closeBanner = () => {
    context.dispatch({ type: AuthAction.TOGGLE_VIDEO });
  };

  const [focused, setFocused] = useState(false);
  const timer = useRef<Timer>(new Timer(closeBanner, 5000));

  const handleMouseOver = () => {
    setFocused(true);
  };

  const handleMouseLeave = () => {
    setFocused(false);
  };

  useEffect(() => {
    if (focused) {
      timer.current.pause();
    } else timer.current.resume();
  }, [focused]);

  useEffect(() => {
    if (context.state.video) timer.current.resume();
  }, [context.state.video]);

  if (!context.state.video) return <></>;
  return (
    <motion.div
      initial={{
        transform: 'translateX(100%)',
      }}
      animate={{
        transform: 'translateX(0%)',
      }}
      exit={{
        transform: 'translateX(100%)',
      }}
      transition={{
        type: 'spring',
      }}
      className="fixed bottom-4 right-4 rounded border bg-white p-4 shadow-2xl"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex w-full gap-x-4">
        <div className="flex flex-1 overflow-hidden rounded">
          <iframe
            src={`https://www.youtube.com/embed/${getVideoId(
              context.state.video.url,
            )}`}
          ></iframe>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <article className="flex flex-col gap-y-2 overflow-hidden">
            <p className="truncate font-bold">{context.state.video.title}</p>
            <h2 className="font-semibold">
              Shared by: {context.state.video.author.email}
            </h2>
            <p className="text-sm">{context.state.video.description}</p>
          </article>
        </div>
      </div>
    </motion.div>
  );
}
