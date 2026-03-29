import React from 'react';
import { Link } from 'react-router';

const Header = () => {
  return (
    // Backdrop-blur and semi-transparent background for Glassmorphism
    <div className="sticky top-0 z-50 w-full px-4 py-2">
      <div className="navbar bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
        
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100/80 backdrop-blur-lg rounded-box w-52">
              <li><Link to='/'>HOME</Link></li>
            
            <li><Link to='/Dashboard'>DASHBOARD</Link></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl iosevka-charon-bold tracking-tight">
            R(S)<span className="text-primary">COMMUNITY</span>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
             <li><Link to='/'>HOME</Link></li>
            <li><Link to='/Dashboard'>DASHBOARD</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;