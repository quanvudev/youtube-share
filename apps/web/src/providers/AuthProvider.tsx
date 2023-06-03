import { useMemo, useReducer } from 'react';

import authContext, { AuthState, AuthUser } from '@/context/AuthContext';
import axios from '@/plugins/axios';

export enum AuthAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
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

export type AuthActionType = LOGIN | LOGOUT;

const authReducer = (state: AuthState, action: AuthActionType) => {
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

  const [state, dispatch] = useReducer(authReducer, {
    token: undefined,
    user: undefined,
  });

  function login(token: string, user: AuthUser) {
    dispatch({
      type: AuthAction.LOGIN,
      payload: {
        token,
        user,
      },
    });

    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  function logout() {
    dispatch({
      type: AuthAction.LOGOUT,
    });
    // eslint-disable-next-line unicorn/no-null
    axios.defaults.headers['Authorization'] = null;
  }

  const value = useMemo(() => ({ state, dispatch, login, logout }), [state]);

  return <Provider value={value}>{children}</Provider>;
}
