import { useAuthContext } from '@/hooks/useAuthContext';

import { render, screen } from '../../test/utils/TestUtils';
import AuthorizeComponent from '../AuthorizeComponent';

// Mock the useAuthContext hook
jest.mock('@/hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(),
}));

test('renders children when user is authenticated', () => {
  (useAuthContext as jest.Mock).mockReturnValue({ isAuth: true });

  render(
    <AuthorizeComponent>
      <div>Authorized Content</div>
    </AuthorizeComponent>,
  );

  const authorizedContent = screen.getByText('Authorized Content');
  expect(authorizedContent).toBeInTheDocument();

  const unauthorizedMessage = screen.queryByText('UnAuthorize');
  expect(unauthorizedMessage).not.toBeInTheDocument();
});

test('renders unauthorized message when user is not authenticated', () => {
  (useAuthContext as jest.Mock).mockReturnValue({ isAuth: false });

  render(
    <AuthorizeComponent>
      <div>Authorized Content</div>
    </AuthorizeComponent>,
  );

  const authorizedContent = screen.queryByText('Authorized Content');
  expect(authorizedContent).not.toBeInTheDocument();

  const unauthorizedMessage = screen.getByText('UnAuthorize');
  expect(unauthorizedMessage).toBeInTheDocument();

  const unauthorizedMessageContent = screen.getByText(
    'You are not authorized to access this page. Please log in to continue.',
  );
  expect(unauthorizedMessageContent).toBeInTheDocument();
});
