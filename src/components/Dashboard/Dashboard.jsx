import React, { useState, useEffect } from 'react';
import { Battery, Wifi, WifiOff, Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';
import Prediction from './prediction/Prediction'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState({ level: 0, charging: false });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // 1. Clock Logic
    const timer = setInterval(() => setTime(new Date()), 1000);

    // 2. Battery Logic
    if (navigator.getBattery) {
      navigator.getBattery().then((bat) => {
        const updateBattery = () => {
          setBattery({ level: Math.round(bat.level * 100), charging: bat.charging });
        };
        updateBattery();
        bat.onlevelchange = updateBattery;
        bat.onchargingchange = updateBattery;
      });
    }

    // 3. Online/Offline Listener
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = () => {
    // localStorage bad diye sessionStorage clear korte hobe
    sessionStorage.clear();
    navigate('/'); // window.location.href er cheye navigate('/') beshi fast
  };

  return (
    <div className="p-3 md:p-10 min-h-fit rounded-2xl w-full flex flex-col gap-4 md:gap-8 font-sans bg-[#050505]">
      
      {/* PREDICTION COMPONENT */}
      <div className="w-full max-w-4xl mx-auto">
         <Prediction />
      </div>

      {/* STATS & INFO BAR - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto w-full">        
        
        {/* Date & Time Card - Full width on mobile */}
        <div className="col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3 md:gap-6">
            <div className="p-2 md:p-4 bg-primary/10 rounded-xl md:rounded-3xl text-primary border border-primary/20">
              <Clock className="w-5 h-5 md:w-8 md:h-8" />
            </div>
            <div>
              <h2 className="text-xl md:text-4xl font-black tracking-tighter font-mono text-white">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
              </h2>
              <p className="text-[8px] md:text-xs opacity-50 flex items-center gap-1 mt-0.5 uppercase tracking-widest font-bold">
                <Calendar size={10} /> {time.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
        </div>

        {/* Battery Status */}
        <div className="bg-white/5 border border-white/10 p-3 md:p-6 rounded-2xl md:rounded-[2rem] flex items-center gap-3 md:gap-5 shadow-xl">
          <div className={`p-2 md:p-3 rounded-lg md:rounded-2xl ${battery.charging ? 'bg-success/20 text-success animate-pulse' : 'bg-primary/10 text-primary'}`}>
            <Battery className="w-4 h-4 md:w-6 md:h-6" />
          </div>
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-white">{battery.level}%</h2>
            <p className="text-[7px] md:text-[10px] uppercase opacity-40 font-black tracking-widest">Power</p>
          </div>
        </div>

        {/* Connection Status */}
        <div className="bg-white/5 border border-white/10 p-3 md:p-6 rounded-2xl md:rounded-[2rem] flex items-center gap-3 md:gap-5 shadow-xl">
          <div className={`p-2 md:p-3 rounded-lg md:rounded-2xl ${isOnline ? 'bg-info/20 text-info' : 'bg-error/20 text-error animate-ping'}`}>
            {isOnline ? <Wifi className="w-4 h-4 md:w-6 md:h-6" /> : <WifiOff className="w-4 h-4 md:w-6 md:h-6" />}
          </div>
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-white">{isOnline ? "Stable" : "Lost"}</h2>
            <p className="text-[7px] md:text-[10px] uppercase opacity-40 font-black tracking-widest">Network</p>
          </div>
        </div>
      </div>

      {/* Logout Button Container */}
      <div className='flex justify-center mt-4 md:mt-auto pb-6 md:pb-10'>
        <button 
          onClick={handleLogout} 
          className="btn btn-sm md:btn-md btn-ghost border-white/10 hover:bg-red-500/20 hover:text-red-400 rounded-full px-8 md:px-10 transition-all active:scale-95 text-[10px] md:text-xs font-bold uppercase tracking-widest"
        >
          Secure Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;