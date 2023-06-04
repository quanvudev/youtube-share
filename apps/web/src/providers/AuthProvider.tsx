import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import authContext, { AuthState, AuthUser } from '@/context/AuthContext';
import axios from '@/plugins/axios';
import { DefaultEventsMap, Video } from '@/types';

export enum AuthAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
}

type LOGIN = {
  type: AuthAction.LOGIN;
  payload: {
    token: string;
    user: AuthUser;
  };
};
type LOGOUT = {
  type: AuthAction.LOGOUT;
};

type TOGGLE_VIDEO = {
  type: AuthAction.TOGGLE_VIDEO;
  payload?: Video;
};

export type AuthActionType = LOGIN | LOGOUT | TOGGLE_VIDEO;

const authReducer = (
  state: AuthState & {
    video?: Video;
  },
  action: AuthActionType,
) => {
  switch (action.type) {
    case AuthAction.LOGIN: {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case AuthAction.LOGOUT: {
      return {
        ...state,
        token: undefined,
        user: undefined,
      };
    }
    case AuthAction.TOGGLE_VIDEO: {
      return {
        ...state,
        video: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const Provider = authContext.Provider;
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const [state, dispatch] = useReducer(authReducer, {
    token: undefined,
    user: undefined,
    video: undefined,
  });

  const login = useCallback(
    (token: string, user: AuthUser) => {
      dispatch({
        type: AuthAction.LOGIN,
        payload: {
          token,
          user,
        },
      });
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
      socket.current?.emit('socket_login', token);
    },
    [socket],
  );

  const logout = useCallback(() => {
    dispatch({
      type: AuthAction.LOGOUT,
    });
    // eslint-disable-next-line unicorn/no-null
    axios.defaults.headers['Authorization'] = null;
    socket.current?.emit('socket_logout');
  }, [socket]);

  const value = useMemo(
    () => ({ state, socket, dispatch, login, logout }),
    [login, logout, socket, state],
  );

  function handleNewVideo(video: Video) {
    dispatch({
      type: AuthAction.TOGGLE_VIDEO,
      payload: video,
    });
  }

  const bootstrap = useCallback(() => {
    // listen new video event
    socket.current?.on('new_video', (video) => {
      handleNewVideo(video);
    });
  }, []);

  useEffect(() => {
    socket.current = io('http://localhost:3001', { autoConnect: true });
    bootstrap();
  }, [bootstrap]);

  return <Provider value={value}>{children}</Provider>;
}
