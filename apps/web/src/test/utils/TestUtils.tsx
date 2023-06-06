import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import * as ReactQuery from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

import AuthProvider from '../../providers/AuthProvider';

jest.mock('react-query', () => {
  const original: typeof ReactQuery = jest.requireActual('react-query');

  return {
    ...original,
    useQuery: () => ({ isLoading: false, error: {}, data: [] }),
  };
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
