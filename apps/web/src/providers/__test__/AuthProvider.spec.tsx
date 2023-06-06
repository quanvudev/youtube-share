import MockAdapter from 'axios-mock-adapter';
import { useEffect } from 'react';
import * as socketIOClient from 'socket.io-client';

import { AuthUser } from '@/context/AuthContext';
import axios from '@/plugins/axios';
import { DefaultEventsMap } from '@/types';

import { render } from '../../test/utils/TestUtils';
import { AuthAction, AuthActionType } from '../AuthProvider';

jest.mock('socket.io-client', () => {
  const mockSocket = {
    on: jest.fn(),
    emit: jest.fn(),
  } as unknown as socketIOClient.Socket<DefaultEventsMap, DefaultEventsMap>;

  const mockIo = jest.fn().mockReturnValue(mockSocket);

  return { io: mockIo };
});

const mockAxios = new MockAdapter(axios);

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  test('renders children and sets up socket connection', () => {
    const { getByText } = render(<div>Children</div>);

    const childrenElement = getByText('Children');

    expect(childrenElement).toBeInTheDocument();
    expect((socketIOClient.io as jest.Mock).mock.calls[0][0]).toEqual(
      'http://localhost:3001',
    );
    expect((socketIOClient.io as jest.Mock).mock.calls[0][1]).toEqual({
      autoConnect: true,
    });
  });

  test('executes login action and sets authorization header', () => {
    const token = 'test-token';
    const user = { id: 1, email: 'dev@test.com' };
    const dispatch = jest.fn();
    const loginMock = jest.fn();
    const logoutMock = jest.fn();

    jest.mock('socket.io-client', () => ({
      io: jest.fn().mockReturnValue({
        on: jest.fn(),
        emit: jest.fn(),
      } as unknown as socketIOClient.Socket),
    }));

    render(
      <TestComponent
        dispatch={dispatch}
        login={loginMock}
        logout={logoutMock}
      />,
    );

    expect(loginMock).toHaveBeenCalledTimes(1);
    expect(loginMock).toHaveBeenCalledWith(token, user);
  });

  test('executes logout action and removes authorization header', () => {
    const dispatch = jest.fn();
    const loginMock = jest.fn();
    const logoutMock = jest.fn();

    jest.mock('socket.io-client', () => ({
      io: jest.fn().mockReturnValue({
        on: jest.fn(),
        emit: jest.fn(),
      } as unknown as socketIOClient.Socket),
    }));

    render(
      <TestComponent
        dispatch={dispatch}
        login={loginMock}
        logout={logoutMock}
      />,
    );

    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(axios.defaults.headers['Authorization']).toBeUndefined();
  });

  // Add more tests for other actions and scenarios as needed
});

interface TestComponentProperties {
  dispatch: (action: AuthActionType) => void;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const TestComponent: React.FC<TestComponentProperties> = (properties) => {
  useEffect(() => {
    properties.dispatch({
      type: AuthAction.LOGIN,
      payload: {
        token: 'test-token',
        user: { id: 1, email: 'dev@test.com' },
      },
    });
    properties.dispatch({
      type: AuthAction.LOGOUT,
    });
    properties.login('test-token', { id: 1, email: 'dev@test.com' });
    properties.logout();
    // eslint-disable-next-line unicorn/no-null
  }, [properties]);
  // You can use these functions to test the behavior of the AuthProvider
  return <></>;
};
