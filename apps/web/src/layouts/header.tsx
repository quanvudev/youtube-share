import { FaHome } from 'react-icons/fa';

import AuthForm from './AuthForm';

function LayoutHeader() {
  return (
    <header className="flex w-full py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-x-4" id="headerLogo">
          <FaHome className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Funny Movie</h1>
        </div>
        <AuthForm />
      </div>
    </header>
  );
}
export default LayoutHeader;
