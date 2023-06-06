import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter as Router } from 'react-router-dom';

import { useAuthContext } from '@/hooks/useAuthContext';
import axios from '@/plugins/axios';

import { fireEvent, render, waitFor } from '../../test/utils/TestUtils';
import AuthForm from '../AuthForm';

jest.mock('@/hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(),
}));

const axiosMock = new MockAdapter(axios);

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axiosMock.reset();
  });

  test('renders login form', () => {
    const mockUseAuthContext = useAuthContext as jest.MockedFunction<
      typeof useAuthContext
    >;
    mockUseAuthContext.mockReturnValue({
      isAuth: false,
      state: {},
      login: jest.fn(),
      logout: jest.fn(),
      dispatch: jest.fn(),
    });

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthForm />
      </Router>,
    );

    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('submits form with user input', async () => {
    const mockUseAuthContext = useAuthContext as jest.MockedFunction<
      typeof useAuthContext
    >;
    mockUseAuthContext.mockReturnValue({
      isAuth: false,
      state: {},
      login: jest.fn(),
      logout: jest.fn(),
      dispatch: jest.fn(),
    });

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthForm />
      </Router>,
    );

    axiosMock.onPost('/auth').reply(200, {
      accessToken: 'mock-access-token',
      user: {
        email: 'test@example.com',
        id: 123,
      },
    });

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1);
      expect(axiosMock.history.post[0].url).toBe('/auth');
      expect(JSON.parse(axiosMock.history.post[0].data)).toEqual({
        email: 'test@example.com',
        password: 'password123',
      });
      // Add assertions for the success scenario based on your component's behavior
    });
  });

  test('renders authenticated user information', () => {
    const user = {
      email: 'test@example.com',
      id: 123,
    };

    const mockUseAuthContext = useAuthContext as jest.MockedFunction<
      typeof useAuthContext
    >;
    mockUseAuthContext.mockReturnValue({
      isAuth: true,
      state: {
        user: user,
      },
      login: jest.fn(),
      logout: jest.fn(),
      dispatch: jest.fn(),
    });

    const { getByText } = render(
      <Router>
        <AuthForm />
      </Router>,
    );

    expect(getByText(`${user.email}`)).toBeInTheDocument();
    expect(getByText('Share a movie')).toBeInTheDocument();
    expect(getByText('Log out')).toBeInTheDocument();
  });
});
