import { BrowserRouter as Router } from 'react-router-dom';

import { render, screen } from '../../test/utils/TestUtils';
import LayoutHeader from '../header';

describe('LayoutHeader', () => {
  test('renders logo and title', () => {
    render(
      <Router>
        <LayoutHeader />
      </Router>,
    );

    const logoElement = screen.getByTestId('headerLogo');
    const titleElement = screen.getByText('Funny Movie');

    expect(logoElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });

  test('renders AuthForm', () => {
    render(
      <Router>
        <LayoutHeader />
      </Router>,
    );

    const authFormElement = screen.getByTestId('auth-form');

    expect(authFormElement).toBeInTheDocument();
  });
});
