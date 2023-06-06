import { renderHook } from '@testing-library/react-hooks';

import authContext from '@/context/AuthContext';

import { useAuthContext } from '../useAuthContext';

describe('useAuthContext', () => {
  it('should return the auth context values', () => {
    const token = 'yourToken';
    const user = { id: 1, email: 'example@example.com' };

    const dispatch = jest.fn(); // Mock the dispatch function

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <authContext.Provider value={{ state: { token, user }, dispatch }}>
        {children}
      </authContext.Provider>
    );

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    expect(result.current.state.token).toBe(token);
    expect(result.current.state.user).toEqual(user);
    expect(result.current.isAuth).toBe(true);
  });

  it('should return isAuth as false when token or user is missing', () => {
    const token = undefined;
    const user = { id: 123, email: 'example@example.com' };

    const dispatch = jest.fn(); // Mock the dispatch function

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <authContext.Provider value={{ state: { token, user }, dispatch }}>
        {children}
      </authContext.Provider>
    );

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    expect(result.current.state.token).toBe(token);
    expect(result.current.state.user).toEqual(user);
    expect(result.current.isAuth).toBe(false);
  });

  // Add more test cases as needed
});
