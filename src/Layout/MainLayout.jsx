import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/shared/Header/Header';
import Footer from '../components/shared/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-grow container mx-auto px-4 pb-32 md:pb-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;