import { createContext } from 'react';

import { AuthActionType } from '@/providers/AuthProvider';

export type AuthState = {
  token?: string;
  user?: {
    id: string;
    name: string;
  };
};

export type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthActionType>;
  login?: (
    token: string,
    user: {
      name: string;
      id: string;
    },
  ) => void;
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
