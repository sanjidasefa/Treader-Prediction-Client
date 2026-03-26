import React, { useState, useEffect } from 'react';
import { Battery, Wifi, WifiOff, Clock, Calendar, ShieldCheck, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState({ level: 0, charging: false });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Prediction Logic State
  const [prediction, setPrediction] = useState({ 
    signal: "ANALYZING", 
    color: "text-gray-400", 
    bg: "bg-gray-500/10",
    icon: <AlertCircle size={48} />
  });

  useEffect(() => {
    // 1. Clock Logic
    const timer = setInterval(() => setTime(new Date()), 1000);

    // 2. Prediction Change Logic (Mocking Backend Data)
    // Protikhon 10 second por por signal change hobe
    const signalTimer = setInterval(() => {
      const signals = [
        { signal: "STRONG BUY", color: "text-success", bg: "bg-success/20", icon: <TrendingUp size={48} /> },
        { signal: "STRONG SELL", color: "text-error", bg: "bg-error/20", icon: <TrendingDown size={48} /> },
        { signal: "WAITING", color: "text-warning", bg: "bg-warning/20", icon: <AlertCircle size={48} /> }
      ];
      const randomSignal = signals[Math.floor(Math.random() * signals.length)];
      setPrediction(randomSignal);
    }, 10000); 

    // 3. Battery Logic
    if (navigator.getBattery) {
      navigator.getBattery().then((bat) => {
        setBattery({ level: Math.round(bat.level * 100), charging: bat.charging });
        bat.onlevelchange = () => setBattery({ level: Math.round(bat.level * 100), charging: bat.charging });
      });
    }

    return () => {
      clearInterval(timer);
      clearInterval(signalTimer);
    };
  }, []);

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.setItem("userRole", "");
  window.location.href = "/"; 
};
  return (
    <div className="p-4 md:p-6 min-h-screen w-full flex flex-col gap-6 font-sans mb-20">
      
      {/* 1. MAIN PREDICTION SIGNAL (Top Attraction) */}
      <div className="relative flex-grow flex flex-col items-center justify-center py-10 px-6 bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden">
        {/* Animated Glow behind signal */}
        <div className={`absolute w-64 h-64 rounded-full blur-[120px] opacity-30 ${prediction.bg}`}></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="badge badge-primary badge-outline mb-4 iosevka-charon-medium px-4 py-3">
            Live Market Analysis
          </div>
          
          <h3 className="text-xl opacity-60 mb-2 iosevka-charon-regular uppercase tracking-widest">Current Signal</h3>
          
          <div className={`p-8 rounded-full ${prediction.bg} ${prediction.color} mb-6 transition-all duration-700 animate-bounce`}>
            {prediction.icon}
          </div>

          <h1 className={`text-5xl md:text-7xl font-black tracking-tighter transition-all duration-700 ${prediction.color}`}>
            {prediction.signal}
          </h1>

          <p className="mt-6 text-sm opacity-50 iosevka-charon-light italic">
            *Signals update every 10 seconds based on R(S) Community algorithm.
          </p>
        </div>
      </div>

      {/* 2. STATS & INFO BAR (Now at Bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">        
        {/* Date & Time Card */}
        <div className="col-span-2 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-6 rounded-3xl flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-2xl text-primary">
              <Clock size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight iosevka-charon-bold">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </h2>
              <p className="text-sm opacity-60 flex items-center gap-2">
                <Calendar size={14} /> {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
        {/* Battery */}
        <div className="bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className={`${battery.charging ? 'text-success animate-pulse' : 'text-primary'}`}>
            <Battery size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{battery.level}%</h2>
            <p className="text-[10px] uppercase opacity-50 tracking-wider">Power Status</p>
          </div>
        </div>

        {/* WiFi */}
        <div className="bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className={isOnline ? 'text-info' : 'text-error'}>
            {isOnline ? <Wifi size={24} /> : <WifiOff size={24} />}
          </div>
          <div>
            <h2 className="text-xl font-bold">{isOnline ? "Stable" : "Lost"}</h2>
            <p className="text-[10px] uppercase opacity-50 tracking-wider">Connection</p>
          </div>
        </div>
      </div>
      <button onClick={handleLogout} className="btn btn-error">Log Out</button>
    </div>
  );
};

export default Dashboard;