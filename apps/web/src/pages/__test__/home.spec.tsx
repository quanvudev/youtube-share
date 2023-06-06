import { render, screen } from '../../test/utils/TestUtils';
import HomePage from '../home';

describe('HomePage', () => {
  test('renders VideoList component', () => {
    render(<HomePage />);
    const videoList = screen.getByTestId('homePage');
    expect(videoList).toBeInTheDocument();
  });
});
