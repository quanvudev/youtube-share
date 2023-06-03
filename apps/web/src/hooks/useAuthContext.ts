import { useContext, useMemo } from 'react';

import authContext from '@/context/AuthContext';

export function useAuthContext() {
  const context = useContext(authContext);

  const isAuth = useMemo(() => {
    return Boolean(context.state.token) && Boolean(context.state.user);
  }, [context.state.token, context.state.user]);

  return { ...context, isAuth };
}
