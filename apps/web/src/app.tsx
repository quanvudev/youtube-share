import { Route, Routes } from 'react-router-dom';

import DefaultLayout from './layouts/default';
import HomePage from './pages/home';

const App = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </DefaultLayout>
  );
};

export default App;
