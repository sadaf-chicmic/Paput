import { useEffect } from 'react';
import Nav from '../components/common/Nav';
import { Outlet } from 'react-router';
import Footer from '../components/common/Footer';
export default function Layout() {
  return (
    <>
      <Nav />
      <main className="w-full min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
