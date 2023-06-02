import { useMemo, useReducer } from 'react';

import authContext, { AuthState } from '@/context/AuthContext';

enum AuthAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type LOGIN = {
  type: AuthAction.LOGIN;
  payload: {
    token: string;
    user: {
      name: string;
      id: string;
    };
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

  function login(token: string, user: { name: string; id: string }) {
    dispatch({
      type: AuthAction.LOGIN,
      payload: {
        token,
        user,
      },
    });
  }

  function logout() {
    dispatch({
      type: AuthAction.LOGOUT,
    });
  }

  const value = useMemo(() => ({ state, dispatch, login, logout }), [state]);

  return <Provider value={value}>{children}</Provider>;
}
