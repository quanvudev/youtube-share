import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import AuthForm from './AuthForm';

function LayoutHeader() {
  return (
    <header className="flex w-full py-2" data-testid="layout-header">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-x-4"
          id="headerLogo"
          data-testid="headerLogo"
        >
          <FaHome className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Funny Movie</h1>
        </Link>
        <AuthForm />
      </div>
    </header>
  );
}
export default LayoutHeader;
