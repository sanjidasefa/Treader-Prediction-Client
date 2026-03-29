import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, ShieldCheck, History } from "lucide-react";
import api from "../../../api/axios";
import introimg from '../../../../public/icon.jpeg';

const Prediction = () => {
  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState(30);
  const [showWeb, setShowWeb] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [serial, setSerial] = useState(51770n); 

  const getDynamicDateStr = () => {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const serverTime = new Date(utcTime + (6 * 3600000)); 
    const year = serverTime.getFullYear();
    const month = String(serverTime.getMonth() + 1).padStart(2, "0");
    const day = String(serverTime.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };
  const [dateStr, setDateStr] = useState(getDynamicDateStr());
  const fetchDynamicData = async () => {
    try {
      const response = await api.get("/prediction");
      if (response.data) setData(response.data);
    } catch (error) { 
      console.error("Sync Error:", error); 
    }
  };

 useEffect(() => {
    fetchDynamicData();
    
    const timer = setInterval(() => {
      const now = new Date();
      const fastNow = new Date(now.getTime()); 
      const seconds = fastNow.getSeconds();
      const remain = seconds < 30 ? 30 - seconds : 60 - seconds;      
      setCountdown(remain);
      if (remain === 30) {
        setSerial(prevSerial => prevSerial + 1n);
        setDateStr(getDynamicDateStr()); 
      }
      if (remain === 5) {
        fetchDynamicData();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  if (!data) return <div className="h-screen bg-[#050505] flex items-center justify-center"><div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>;
  const fullPeriodId = `${dateStr}1000${serial.toString()}`;

  return (
    <div className="h-screen flex flex-col bg-[#050505] text-slate-200 font-sans overflow-hidden">
      <div className={`${showWeb ? (isExpanded ? "h-0 overflow-hidden" : "h-[38vh]") : "h-full"} transition-all duration-300 p-2 space-y-2 overflow-y-auto`}>
        
        <div className="flex justify-between items-center bg-white/5 p-1.5 px-3 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <img src={introimg} alt="logo" className="w-6 h-6 rounded-full border border-cyan-500/30" />
            <h2 className="text-md font-black text-cyan-500 uppercase">R(S) COMMUNITY</h2>
          </div>
          <button onClick={() => setShowWeb(!showWeb)} className="bg-cyan-500 text-black px-3 py-1 rounded font-bold text-[9px] uppercase shadow-[0_0_10px_#06b6d4]">
            {showWeb ? "Hide Market" : "Market"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-2.5 relative overflow-hidden">
             <div className={`absolute -top-5 -right-5 w-16 h-16 blur-2xl opacity-20 ${data.prediction?.toUpperCase() === 'BIG' ? 'bg-orange-500' : 'bg-cyan-500'}`} />
             <p className="text-[10px] font-bold text-white/80 uppercase">Prediction</p>
             <h1 className={`text-2xl font-black italic tracking-tighter ${data.prediction?.toUpperCase() === 'BIG' ? 'text-orange-500' : 'text-cyan-400'}`}>
                {data.prediction}
             </h1>
             
             {/* ৩. Ekane apnar chawa strictly formatted ID dekhabe */}
             <p className="text-[10px] font-mono text-white/80 tracking-tighter">P-{fullPeriodId}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-white/80 uppercase">Timer</span>
                <span className="text-orange-500 text-sm font-black font-mono">00:{String(countdown).padStart(2, "0")}</span>
             </div>
             <div className="flex justify-between items-center border-t border-white/5 pt-1">
                <span className="text-[10px] font-bold text-white/80 uppercase">Target</span>
                <span className="text-xs font-black text-white">{data.resultNumber?.toString().padStart(2, "0")}</span>
             </div>
          </div>
        </div>

        {/* Baki pattern history code thakbe... */}
        <div className="bg-[#0a0a0a] border border-white/10 p-2 rounded-xl">
          <div className="flex justify-between items-center mb-1.5 px-1">
             <div className="flex items-center gap-1 text-white/80 uppercase text-[10px] font-bold">
                <History size={10} /> <span>Pattern History</span>
             </div>
             <span className="text-[10px] text-green-500 font-bold uppercase flex items-center gap-0.5">
                <ShieldCheck size={8}/> Smart Analysis
             </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {data.lastUpdates?.slice(0, 5).map((item, idx) => {
              const itemIsBig = item.includes("B");
              return (
                <div key={idx} className="flex flex-col items-center py-1.5 bg-white/5 rounded-lg border border-white/5">
                  <span className={`text-[12px] font-black font-mono ${itemIsBig ? "text-orange-500" : "text-cyan-400"}`}>
                    {item.replace(/\D/g, "").padStart(2, "0")}
                  </span>
                  <div className={`w-1 h-1 rounded-full mt-1 ${itemIsBig ? "bg-orange-500" : "bg-cyan-400"} opacity-50`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showWeb && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 150 }}
            className={`flex flex-col bg-white border-t border-cyan-500 z-[100] ${isExpanded ? "h-full" : "h-[80vh]"}`}
          >
            <div className="bg-[#111] p-1.5 flex justify-between items-center px-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none">LIVE MARKET</span>
              </div>
              <div className="flex gap-4 items-center">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-cyan-400">
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button onClick={() => setShowWeb(false)} className="text-red-500 bg-red-500/10 p-1 rounded">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex-grow bg-white">
              <iframe 
                src="https://dkwin9.com/#/register?invitationCode=23478531386" 
                className="w-full h-full border-none"
                title="Market"
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Prediction;