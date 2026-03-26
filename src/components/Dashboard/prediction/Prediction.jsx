import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, TrendingUp, TrendingDown, Zap, Clock, Activity, Target, ShieldCheck } from 'lucide-react';
import api from '../../../api/axios';

const Prediction = () => {
  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState(30);

  const fetchDynamicData = async () => {
    try {
      const response = await api.get('/prediction');
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Vercel Connection Error:", error);
    }
  };

  useEffect(() => {
    fetchDynamicData(); 
   
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchDynamicData();
          return 30; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!data) return <div className="text-center p-10 font-bold opacity-30">Connecting to RS Algo Engine...</div>;

  const isBig = data.signal === "BIG";

  return (
    <div className="relative group overflow-hidden bg-white/5 border border-white/10 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl transition-all hover:border-primary/20">
      
      {/* Background Glow (matching current signal) */}
      <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[80px] ${isBig ? 'bg-orange-500/10' : 'bg-blue-500/10'}`}></div>

      {/* Header Info */}
      <div className="flex justify-between items-start mb-10 z-10 relative">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 block mb-1">Live RS Algo V3.0</span>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Zap size={22} className="text-yellow-400 animate-pulse uppercase" />R(S) COMMUNITY CENTER PREDICTOR
          </h2>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] uppercase opacity-40 font-bold block mb-1 tracking-widest">Update In</span>
          <span className="font-mono text-3xl font-black text-primary transition-all duration-300">
            {countdown}s
          </span>
          <span className="text-[11px] opacity-30 mt-1 font-bold">30s Signal Engine</span>
        </div>
      </div>

      {/* Main Signal Display */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-8 rounded-[2.5rem] bg-black/20 border border-white/5 shadow-inner">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
           <span className="text-[11px] uppercase opacity-40 font-black tracking-[0.2em] mb-1">Next Signal</span>
           <h1 className={`text-7xl md:text-8xl font-black tracking-tighter uppercase drop-shadow-lg ${isBig ? 'text-orange-400' : 'text-blue-400'}`}>
              {data.signal}
           </h1>
           <div className="flex gap-1.5 mt-2 font-black font-mono text-lg opacity-80 tracking-widest text-primary/80">
               [{data.numbers.join("   ")}]
           </div>
        </div>

        <div className="w-full md:w-auto p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex-grow flex items-center justify-center gap-6">
           <div className="flex flex-col items-center">
             <span className="text-[11px] opacity-40 uppercase font-black tracking-widest">Accuracy</span>
             <span className={`text-5xl font-black tracking-tight ${data.accuracy >= 80 ? 'text-success' : 'text-primary'}`}>
               {data.accuracy}%
             </span>
           </div>
           <div className="w-[1px] h-12 bg-white/10"></div>
           <div className="flex-grow w-full">
               <span className="text-[11px] opacity-40 uppercase font-black tracking-widest text-left block mb-1">Signal Strength</span>
               <progress className="progress progress-primary w-full h-1" value={data.signalStrength} max="100"></progress>
           </div>
        </div>
      </div>

      {/* History Grid (Image history pattern) */}
      <div className="mb-12">
          <span className="text-[11px] uppercase opacity-40 font-black tracking-widest mb-3 block">Pattern History</span>
          <div className="grid grid-cols-8 gap-2">
              {data.lastUpdates.map((item, index) => {
                  const type = item.includes('B') ? 'BIG' : 'SMALL';
                  const number = item.replace('B', '').replace('S', '');
                  const isPositive = type === 'BIG';
                  
                  return (
                      <div key={index} className={`flex flex-col items-center p-3 rounded-lg bg-black/30 border border-white/5 transition-all duration-300 hover:-translate-y-1 ${isPositive ? 'border-orange-500/20' : 'border-blue-500/20'}`}>
                        <span className={`font-black font-mono text-xl ${isPositive ? 'text-orange-400' : 'text-blue-400'}`}>
                           {number}
                        </span>
                        <span className={`text-[10px] uppercase font-bold ${isPositive ? 'text-orange-500/60' : 'text-blue-500/60'}`}>
                           {type.charAt(0)}
                        </span>
                      </div>
                  );
              })}
          </div>
      </div>

      {/* Stats Cards (4 grid items from image) */}
      <div className="grid grid-cols-2 gap-4">
          {[
              { title: "Market Strength", value: `${data.marketStrength}%`, icon: <Target size={18} /> },
              { title: "Avg Accuracy", value: `${data.accuracy}%`, icon: <ShieldCheck size={18} /> },
          ].map((item, idx) => (
             <div key={idx} className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:scale-105 active:scale-95 cursor-default group">
                <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20 group-hover:bg-primary/20 transition-all">
                    {item.icon}
                </div>
                <div>
                   <h2 className="text-2xl font-black font-mono">{item.value}</h2>
                   <p className="text-[10px] uppercase opacity-40 font-black tracking-widest">{item.title}</p>
                </div>
             </div>
          ))}
      </div>

      {/* Progress Bar (Visual Timer) */}
      <div className="absolute bottom-0 left-0 h-1 bg-primary/30 transition-all duration-1000" style={{ width: `${(countdown / 30) * 100}%` }}></div>
    </div>
  );
};

export default Prediction;