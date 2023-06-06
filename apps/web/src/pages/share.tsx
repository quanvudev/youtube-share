import { FormEvent, useMemo, useRef, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import AuthorizeComponent from '@/components/AuthorizeComponent';
import { isValidUrl } from '@/helper/youtubeUrl';
import { createVideo } from '@/services/video';
import { VideoDTO } from '@/types';

export default function SharePage() {
  const [state, setState] = useState<VideoDTO>({
    title: '',
    url: '',
    description: '',
  });

  const firstChanged = useRef<boolean>(false);

  const { isLoading, mutate } = useMutation(createVideo, {
    onSuccess: () => {
      toast.success('Video shared');
      firstChanged.current = false;
      setState({
        title: '',
        url: '',
        description: '',
      });
    },
  });

  function handleChange(
    event_: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = event_.target as HTMLInputElement;
    setState((p) => ({ ...p, [target.name]: target.value }));
  }

  const handleSubmit = (event_: FormEvent<HTMLFormElement>) => {
    event_.preventDefault();
    const isValid = isValidUrl(state.url);
    if (!isValid) return;
    mutate(state);
  };

  const isValid = useMemo(
    () =>
      firstChanged.current
        ? state.url.length > 0 && isValidUrl(state.url)
        : true,
    [state.url],
  );

  return (
    <AuthorizeComponent>
      <div className="container mx-auto">
        <fieldset className="mx-auto mt-16 max-w-screen-sm rounded border bg-white shadow-xl">
          <legend className="mx-4 px-2">
            <span className="text-lg font-bold">Share a Youtube movie</span>
          </legend>
          <form className="w-ful p-4" onSubmit={handleSubmit}>
            <div className="mx-auto flex max-w-md flex-col gap-y-8">
              <div className="flex w-full items-center gap-x-2">
                <label
                  htmlFor="title"
                  className="flex w-24 items-center font-semibold"
                >
                  Title: <span className="text-red-500">*</span>
                </label>
                <input
                  disabled={isLoading}
                  type="text"
                  id="title"
                  onChange={handleChange}
                  value={state.title}
                  name="title"
                  placeholder="Video Title"
                  className="flex flex-1 rounded border px-4 py-2 outline-none transition-all focus:ring"
                />
              </div>
              <div className="flex w-full items-center gap-x-2">
                <label
                  htmlFor="url"
                  className="flex w-24 items-center font-semibold"
                >
                  Youtube url: <span className="text-red-500">*</span>
                </label>
                <input
                  disabled={isLoading}
                  type="text"
                  id="url"
                  name="url"
                  onChange={(event_) => {
                    handleChange(event_);
                    firstChanged.current = true;
                  }}
                  placeholder="Video Url"
                  value={state.url}
                  className="flex flex-1 rounded border px-4 py-2 outline-none transition-all focus:ring"
                />
              </div>

              <div className="flex w-full items-center gap-x-2">
                <label
                  htmlFor="description"
                  className="flex w-24 items-center font-semibold"
                >
                  Description: <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  onChange={handleChange}
                  value={state.description}
                  name="description"
                  placeholder="Video Description"
                  className="flex flex-1 rounded border px-4 py-2 outline-none transition-all focus:ring"
                />
              </div>

              {!isValid && <span className="text-red-500">Invalid url</span>}

              <div className="text-sm text-gray-500">
                Example:
                <ul className="list-inside list-disc pl-4">
                  <li>https://youtu.be/7MKEOfSP2s4</li>
                  <li>https://www.youtube.com/watch?v=7MKEOfSP2s4</li>
                </ul>
              </div>
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="mx-auto flex max-w-fit flex-1 cursor-pointer items-center rounded border bg-blue-500 px-4 py-2 font-semibold text-white outline-none transition-all transition-all focus:ring active:bg-blue-600 disabled:bg-blue-200"
              >
                Share
                {isLoading && (
                  <AiOutlineLoading className="ml-2 animate-spin" />
                )}
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </AuthorizeComponent>
  );
}
