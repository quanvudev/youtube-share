import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './app';
import Banner from './components/Banner';
import AuthProvider from './providers/AuthProvider';

const rootElement = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </BrowserRouter>
      </QueryClientProvider>
      <Banner />
    </AuthProvider>
    <ToastContainer />
  </>,
);
