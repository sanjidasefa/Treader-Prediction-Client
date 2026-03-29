import React, { useEffect, useState } from "react";
import { LayoutDashboard, Globe, ShieldCheck, Terminal } from "lucide-react";
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
    <div className="fixed bottom-1 left-0 w-full z-50 px-2">
      <footer className="max-w-full mx-auto bg-white/10 dark:bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Side: Branding */}
        <div className="flex items-center gap-2 opacity-80 flex-col">
          <img 
            src={introimg} 
            alt="Icon" 
            className='rounded-full mb-4 w-15 h-15 object-cover border-2 border-primary/30 shadow-lg' 
          />    

           <span className="flex  gap-1 justify-center items-center iosevka-char-medium text-[10px] md:text-sm tracking-wide text-white/70">
            <ShieldCheck className="text-primary w-4 h-4 md:w-5 md:h-5" ></ShieldCheck> © 2026{" "}
            <span className="text-primary font-bold uppercase">
              R(S) Community
            </span>
          </span>
        
        </div>

        {/* Right Side: Navigation Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
          {isAdmin && (
            <Link
              to="/LogicCentral"
              className="btn btn-xs md:btn-sm bg-orange-500/10 border-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-white rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Terminal size={14} />
              <span className="iosevka-charon-regular uppercase text-[10px] md:text-xs">
                Logic Central
              </span>
            </Link>
          )}

          {/* Dashboard Button */}
          <Link
            to="/DashBoard"
            className="btn btn-xs md:btn-sm bg-white/5 border-white/10 hover:bg-primary hover:text-white transition-all rounded-lg flex items-center gap-1.5 group text-white/80"
          >
            <LayoutDashboard
              size={14}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className="iosevka-charon-regular uppercase text-[10px] md:text-xs">
              Dashboard
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
