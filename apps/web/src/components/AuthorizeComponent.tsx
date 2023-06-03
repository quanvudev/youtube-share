import { ReactNode } from 'react';

import { useAuthContext } from '@/hooks/useAuthContext';

export default function AuthorizeComponent(properties: {
  children: ReactNode;
}) {
  const { isAuth } = useAuthContext();

  if (isAuth) return <>{properties.children}</>;

  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold">UnAuthorize</h1>
      <p className="mt-4 font-semibold">
        You are not authorized to access this page. Please log in to continue.
      </p>
    </div>
  );
}
