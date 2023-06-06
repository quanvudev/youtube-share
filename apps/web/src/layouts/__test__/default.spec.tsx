import { BrowserRouter } from 'react-router-dom';

import { render } from '../../test/utils/TestUtils';
import DefaultLayout from '../default';

describe('DefaultLayout', () => {
  test('renders children', () => {
    const { getByText } = render(
      <BrowserRouter>
        <DefaultLayout>
          <div>Test Content</div>
        </DefaultLayout>
      </BrowserRouter>,
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  test('renders LayoutHeader', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <DefaultLayout>
          <div>Test Content</div>
        </DefaultLayout>
      </BrowserRouter>,
    );
    const header = getByTestId('layout-header');

    expect(header).toBeInTheDocument();
  });
});
