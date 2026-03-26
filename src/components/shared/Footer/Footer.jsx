import React from 'react';
import { LayoutDashboard, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div className="fixed bottom-1 left-0 w-full z-50 px-2">
      <footer className="max-w-full mx-auto bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      
        <div className="flex items-center gap-2 opacity-80">
          <ShieldCheck className="text-primary w-5 h-5" />
          <span className="iosevka-char-medium text-sm tracking-wide">
            © 2026 <span className="text-primary font-bold">R(S) COMMUNITY CENTER</span>
          </span>
        </div>

        {/* Right Side: Navigation Buttons */}
        <div className="flex justify-center items-center gap-4">
          {/* Dashboard Button */}
          <button className="btn btn-sm md:btn-md bg-white/5 border-white/10 hover:bg-primary hover:text-white transition-all duration-300 rounded-xl flex items-center gap-2 group">
            <LayoutDashboard size={18} className="group-hover:rotate-12 transition-transform" />
            <Link to='/DashBoard' className="iosevka-charon-regular">Dashboard</Link>
          </button>

          {/* External Website Button */}
          <a 
            href="https://.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-sm md:btn-md btn-primary shadow-lg shadow-primary/20 rounded-xl flex items-center gap-2 group"
          >
            <Globe size={18} className="group-hover:animate-spin-slow" />
            <span className="iosevka-charon-regular">Official Site</span>
          </a>
        </div>

      </footer>
    </div>
  );
};

export default Footer;