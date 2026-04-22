import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Layout from './Layout/Layout';
import Delivery from './pages/Delivery';
import About from './pages/About';
import Events from './pages/Events';
import Shop from './pages/Shop';
import LargeOrders from './pages/LargeOrders';
import { ROUTES } from './constants/routes';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={ROUTES.DELIVERY} element={<Delivery />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.EVENTS} element={<Events />} />
          <Route path={ROUTES.SHOP} element={<Shop />} />
          <Route path={ROUTES.LARGE_ORDERS} element={<LargeOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
