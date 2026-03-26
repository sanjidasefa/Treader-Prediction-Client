import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, LayoutGrid, Globe, X, Activity, ShieldCheck } from 'lucide-react';
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
    <div className="h-screen flex flex-col items-center rounded-2xl justify-center bg-[#050505]">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
      />
      <p className="text-cyan-500 mt-4 font-mono tracking-[0.5em] animate-pulse">ESTABLISHING UPLINK...</p>
    </div>
  );

  // Database er color field theke CSS class define kora
  const getStatusColor = (colorName) => {
    const c = colorName?.toLowerCase();
    if (c?.includes('red')) return 'from-red-500 to-red-600';
    if (c?.includes('green')) return 'from-green-500 to-green-600';
    if (c?.includes('violet')) return 'from-purple-500 to-purple-600';
    return 'from-cyan-500 to-blue-500'; // Default
  };

  const isBig = data.prediction?.toUpperCase() === "BIG";
  const glowColor = data.color?.toLowerCase().includes('red') ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)';

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-4 lg:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* --- MAIN PREDICTION PANEL --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex-grow space-y-8 transition-all duration-700 ${showWeb ? 'lg:w-[45%]' : 'w-full'}`}
        >
          
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Activity className="text-cyan-400 animate-pulse" size={20} />
              </div>
              <div>
                <h2 className="text-xs font-black tracking-widest text-cyan-500 uppercase">RS ALGO V4 • PRO</h2>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-ping ${data.color?.toLowerCase().includes('red') ? 'bg-red-500' : 'bg-green-500'}`} />
                  <span className="text-[10px] text-white/40 font-mono">LIVE SERVER CONNECTED</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowWeb(!showWeb)}
              className="group relative flex items-center gap-2 bg-white/5 hover:bg-cyan-500/20 px-6 py-2.5 rounded-xl border border-white/10 transition-all overflow-hidden"
            >
              {showWeb ? <X size={16} className="text-red-400"/> : <Globe size={16} className="text-cyan-400"/>}
              <span className="text-xs font-bold tracking-tighter uppercase">{showWeb ? "Exit Market" : "Terminal View"}</span>
            </button>
          </div>

          {/* Center Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Prediction Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative group bg-gradient-to-br from-white/10 to-transparent p-1 shadow-2xl rounded-[2.5rem]"
            >
              <div className="bg-[#0a0a0a] rounded-[2.4rem] p-10 h-full relative overflow-hidden">
                {/* Glow based on DB color */}
                <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20" style={{ backgroundColor: glowColor }} />
                
                <p className="text-[10px] font-bold text-white/40 tracking-[0.3em] mb-2">NEXT ANALYSIS</p>
                <motion.h1 
                  key={data.prediction}
                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  className={`text-8xl font-black tracking-tighter italic ${isBig ? 'text-orange-500' : 'text-cyan-400'}`}
                  style={{ filter: `drop-shadow(0 0 15px ${glowColor})` }}
                >
                  {data.prediction}
                </motion.h1>
                
                <div className="mt-8 flex items-center gap-4 text-white/30 font-mono text-[11px]">
                  <span className="bg-white/5 px-3 py-1 rounded-full border border-white/5">PERIOD {data.period}</span>
                  <span className={`px-3 py-1 rounded-full border border-white/5 bg-gradient-to-r ${getStatusColor(data.color)} text-white font-bold`}>
                    {data.color?.toUpperCase()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Result Number Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden"
            >
               <div className="relative z-10 text-center">
                  <p className="text-[10px] font-black text-cyan-500 tracking-widest uppercase">Target Number</p>
                  <motion.h3 
                    key={data.resultNumber}
                    initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                    className="text-8xl font-black text-white mt-1"
                  >
                    {data.resultNumber?.toString().padStart(2, '0')}
                  </motion.h3>
                  
                  <div className="mt-4 flex justify-between items-center text-right border-t border-white/5 pt-4">
                    <div>
                        <p className="text-[10px] text-white/20 font-mono">CONFIDENCE</p>
                        <p className="text-xl font-mono font-bold text-cyan-500">{data.confidence}%</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-white/20 font-mono">REFRESH</p>
                        <p className="text-xl font-mono font-bold text-orange-500">{countdown}s</p>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* History Section */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-3">
                <LayoutGrid size={16} className="text-cyan-500"/> Sequence History
              </h3>
              <div className="h-[1px] flex-grow mx-6 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
              <AnimatePresence mode='popLayout'>
                {data.lastUpdates?.map((item, idx) => {
                  const itemIsBig = item.includes('B');
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex flex-col items-center p-4 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors"
                    >
                      <span className={`text-xl font-black font-mono mb-1 ${itemIsBig ? 'text-orange-500' : 'text-cyan-400'}`}>
                        {item.replace(/\D/g,'').padStart(2, '0')}
                      </span>
                      <span className="text-[8px] tracking-tighter font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                        {itemIsBig ? 'BIG' : 'SMALL'}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* --- MARKET SIDEBAR --- */}
        <AnimatePresence>
          {showWeb && (
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="lg:w-[55%] h-[70vh] lg:h-auto bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] sticky top-8"
            >
              <iframe 
                src="https://www.tradingview.com/chart/" 
                className="w-full h-full border-none pt-12 grayscale-[0.5] invert-[0.05]"
                title="External-Market"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Prediction;