import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Layout from './Layout/Layout';
import Delivery from './pages/Delivery';
import About from './pages/About';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={ROUTES.DELIVERY} element={<Delivery />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
