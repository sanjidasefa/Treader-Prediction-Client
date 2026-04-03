import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/shared/Header/Header';
import Footer from '../components/shared/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="container mx-auto px-4 pb-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;