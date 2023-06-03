import { createContext } from 'react';

import { AuthActionType } from '@/providers/AuthProvider';

export type AuthUser = {
  id: number;
  email: string;
};

export type AuthState = {
  token?: string;
  user?: AuthUser;
};

export type AuthContextType = {
  state: AuthState;
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
