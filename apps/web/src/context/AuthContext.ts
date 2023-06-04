import { createContext, MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';

import { AuthActionType } from '@/providers/AuthProvider';
import { DefaultEventsMap, Video } from '@/types';

export type AuthUser = {
  id: number;
  email: string;
};

export type AuthState = {
  token?: string;
  user?: AuthUser;
  video?: Video;
};

export type AuthContextType = {
  state: AuthState;
  socket?: MutableRefObject<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >;
  dispatch: React.Dispatch<AuthActionType>;
  login?: (token: string, user: AuthUser) => void;
  logout?: () => void;
};

export const initialAuthContext: AuthContextType = {
  dispatch: () => {
    // do nothing
  },
  state: {
    token: undefined,
    user: undefined,
  },
};

const authContext = createContext<AuthContextType>(initialAuthContext);

export default authContext;
