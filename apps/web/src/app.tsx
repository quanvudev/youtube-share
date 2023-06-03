import { Route, Routes } from 'react-router-dom';

import DefaultLayout from './layouts/default';
import HomePage from './pages/home';
import SharePage from './pages/share';

const App = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </DefaultLayout>
  );
};

export default App;
