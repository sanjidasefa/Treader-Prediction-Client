import React, { useState, useEffect } from 'react';
import { Battery, Wifi, WifiOff, Clock, Calendar } from 'lucide-react';
import Prediction from './prediction/Prediction'; // Ensure path is correct

const Dashboard = () => {
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
    localStorage.removeItem("isLoggedIn");
    localStorage.setItem("userRole", "");
    window.location.href = "/"; 
  };

  return (
    <div className="p-4 md:p-10 min-h-screen w-full flex flex-col gap-8 font-sans bg-base-100">
      
      {/* PREDICTION COMPONENT */}
      <div className="w-full max-w-4xl mx-auto">
         <Prediction />
      </div>

      {/* STATS & INFO BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto w-full">        
        
        {/* Date & Time Card */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-primary/10 rounded-3xl text-primary border border-primary/20">
              <Clock size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-black tracking-tighter font-mono">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
              </h2>
              <p className="text-xs opacity-50 flex items-center gap-2 mt-1 uppercase tracking-widest font-bold">
                <Calendar size={14} /> {time.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
        </div>

        {/* Battery Status */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-[2rem] flex items-center gap-5 shadow-xl">
          <div className={`p-3 rounded-2xl ${battery.charging ? 'bg-success/20 text-success animate-pulse' : 'bg-primary/10 text-primary'}`}>
            <Battery size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{battery.level}%</h2>
            <p className="text-[10px] uppercase opacity-40 font-black tracking-widest">Power</p>
          </div>
        </div>

        {/* Connection Status */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-[2rem] flex items-center gap-5 shadow-xl">
          <div className={`p-3 rounded-2xl ${isOnline ? 'bg-info/20 text-info' : 'bg-error/20 text-error animate-ping'}`}>
            {isOnline ? <Wifi size={24} /> : <WifiOff size={24} />}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{isOnline ? "Stable" : "Lost"}</h2>
            <p className="text-[10px] uppercase opacity-40 font-black tracking-widest">Network</p>
          </div>
        </div>
      </div>

      {/* Logout Button Container */}
      <div className='flex justify-center mt-auto pb-10'>
        <button 
          onClick={handleLogout} 
          className="btn btn-ghost border-white/10 hover:bg-error hover:text-white rounded-full px-10 transition-all active:scale-95"
        >
          Secure Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;