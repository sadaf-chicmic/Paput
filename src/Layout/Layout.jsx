import { useEffect } from 'react';
import Nav from '../components/common/Nav';
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/common/Footer';
import { ROUTES } from '../constants/routes';

export default function Layout() {
  const location = useLocation();
  const isOrderPage = location.pathname === ROUTES.ORDER;

  return (
    <>
      {!isOrderPage && <Nav />}
      <main className="w-full min-h-screen">
        <Outlet />
      </main>
      {!isOrderPage && <Footer />}
    </>
  );
}
