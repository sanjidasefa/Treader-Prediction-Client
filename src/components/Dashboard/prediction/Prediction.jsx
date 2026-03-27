import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Globe, X, Activity } from 'lucide-react';
import api from '../../../api/axios';

const Prediction = () => {
  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState(30);
  const [showWeb, setShowWeb] = useState(false);

  const fetchDynamicData = async () => {
    try {
      const response = await api.get('/prediction');
      if (response.data) setData(response.data);
    } catch (error) { console.error("Sync Error:", error); }
  };

 // Market Link
  const MARKET_URL = "https://dkwin9.com/#/register?invitationCode=23478531386";


  useEffect(() => {
    fetchDynamicData();
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { fetchDynamicData(); return 30; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!data) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#050505]">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-cyan-500 mt-2 font-mono text-[10px] tracking-widest uppercase">Syncing...</p>
    </div>
  );

  const getStatusColor = (colorName) => {
    const c = colorName?.toLowerCase();
    if (c?.includes('red')) return 'from-red-500 to-red-600';
    if (c?.includes('green')) return 'from-green-500 to-green-600';
    if (c?.includes('violet')) return 'from-purple-500 to-purple-600';
    return 'from-cyan-500 to-blue-500';
  };

  const isBig = data.prediction?.toUpperCase() === "BIG";
  const glowColor = data.color?.toLowerCase().includes('red') ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)';

  return (
    <div className="rounded-2xl bg-[#050505] text-slate-200 p-2 sm:p-6 font-sans overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-3">
        
        {/* --- MAIN PANEL --- */}
        <div className={`flex-grow space-y-3 ${showWeb ? 'lg:w-[40%]' : 'w-full'}`}>
          
          {/* Top Bar - Very Small on Mobile */}
          <div className="flex justify-between items-center bg-white/5 p-2 px-3 rounded-lg border border-white/10">
            <div className="flex items-center gap-2">
              <Activity className="text-cyan-400" size={14} />
              <div className="leading-tight">
                <h2 className="text-lg font-bold text-cyan-500 uppercase">RS COMMUNITY CENTER</h2>
                <span className="text-sm text-white/30 font-mono uppercase">Status: Live</span>
              </div>
            </div>

            <button 
              onClick={() => setShowWeb(!showWeb)}
              className="flex items-center gap-1 bg-white/10 hover:bg-cyan-500/20 px-3 py-1 rounded-md border border-white/5 transition-all"
            >
              {showWeb ? <X size={12} className="text-red-400"/> : <Globe size={12} className="text-cyan-400"/>}
              <span className="text-[8px] font-bold uppercase">{showWeb ? "Close" : "Market"}</span>
            </button>
          </div>

          {/* Center Cards - Compact Layout */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {/* Prediction Card */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 blur-2xl opacity-10" style={{ backgroundColor: glowColor }} />
              <p className="text-md font-bold text-white/40 tracking-widest mb-1 uppercase">Prediction</p>
              <h1 className={`text-3xl sm:text-5xl font-black italic ${isBig ? 'text-orange-500' : 'text-cyan-400'}`}>
                {data.prediction}
              </h1>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-sm text-white/20 font-mono">P-{data.period}</span>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getStatusColor(data.color)}`} title={data.color} />
              </div>
            </div>

            {/* Target Number Card */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col justify-center text-center">
              <p className="text-md font-bold text-cyan-500 tracking-widest uppercase">Target No.</p>
              <h3 className="text-3xl sm:text-5xl font-black text-white">
                {data.resultNumber?.toString().padStart(2, '0')}
              </h3>
              <div className="mt-2 flex justify-between text-sm font-mono text-white/40 uppercase">
                <span>Acc: {data.confidence}%</span>
                <span>{countdown}s</span>
              </div>
            </div>
          </div>

          {/* History Section - Multi-row on small mobile */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <LayoutGrid size={12} className="text-cyan-500/50"/>
              <h3 className="text-md font-bold text-white/30 uppercase tracking-widest">Recent</h3>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {data.lastUpdates?.slice(0, 10).map((item, idx) => {
                const itemIsBig = item.includes('B');
                return (
                  <div key={idx} className="flex flex-col items-center py-1.5 bg-black/40 rounded-md border border-white/5">
                    <span className={`text-sm font-bold font-mono ${itemIsBig ? 'text-orange-500/80' : 'text-cyan-400/80'}`}>
                      {item.replace(/\D/g,'').padStart(2, '0')}
                    </span>
                    <span className="text-[6px] font-bold opacity-20">{itemIsBig ? 'B' : 'S'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

       
        {/* --- MARKET SIDEBAR (FIXED) --- */}
        <AnimatePresence>
          {showWeb && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="lg:w-[55%] min-h-[300px] bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 border border-cyan-500/20">
                 <ShieldCheck className="text-cyan-400" size={32} />
              </div>
              
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Secure Market Link</h3>
              <p className="text-xs text-white/40 mb-6 max-w-xs mx-auto leading-relaxed">
                Security policy onmly allows opening the market in a secure external window.
              </p>

              <a 
                href={MARKET_URL} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary px-8 rounded-xl flex items-center gap-3 shadow-lg shadow-primary/30 group"
              >
                <span className="font-bold tracking-widest uppercase">Open DkWin Market</span>
                <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <p className="mt-8 text-[9px] text-white/20 uppercase tracking-[0.4em]">Official Node Verified</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Prediction;