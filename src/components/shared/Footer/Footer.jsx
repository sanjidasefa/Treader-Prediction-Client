import React, { useEffect, useState } from "react";
import { LayoutDashboard, ShieldCheck, Terminal } from "lucide-react";
import { Link } from "react-router";
import introimg from '../../../../public/icon.jpeg';

const Footer = () => {
  const [role, setRole] = useState(sessionStorage.getItem("userRole"));

  useEffect(() => {
    const updateRole = () => {
      setRole(sessionStorage.getItem("userRole"));
    };
    const interval = setInterval(updateRole, 1000);
    return () => clearInterval(interval);
  }, []);

  const isAdmin = role === "admin";

  return (
    <div className="w-full px-4 pb-6 mt-10">
      {/* Footer Container - Dark & Glassmorphism Fix */}
      <footer className="max-w-full mx-auto bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-[30px] p-6 flex flex-col items-center justify-center gap-6">
        
        {/* Branding Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
             <img 
              src={introimg} 
              alt="Icon" 
              className='rounded-full w-14 h-14 object-cover border-2 border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]' 
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-4 border-[#0a0a0a]" />
          </div>

          <div className="text-center">
            <span className="flex gap-2 justify-center items-center font-bold text-[11px] tracking-[0.2em] text-white/40 uppercase">
              <ShieldCheck className="text-cyan-400 w-3.5 h-3.5" /> R(S) Community Protocol
            </span>
            <p className="text-[9px] text-white/20 mt-1 uppercase tracking-widest">© 2026 Secure Logic Central</p>
          </div>
        </div>

        {/* Navigation
         Buttons */}
        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              to="/LogicCentral"
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-black rounded-xl transition-all duration-300 group"
            >
              <Terminal size={14} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-wider">Logic Central</span>
            </Link>
          )}

          <Link
            to="/DashBoard"
             className="flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-black rounded-xl transition-all duration-300 group"
          >
            <LayoutDashboard size={14} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-wider">Dashboard</span>
          </Link>
        </div>

      </footer>
    </div>
  );
};

export default Footer;