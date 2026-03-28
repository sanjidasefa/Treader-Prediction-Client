import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Globe,
  X,
  Activity,
  ShieldCheck,
  ExternalLink,
  Maximize2,
  Minimize2,
} from "lucide-react";
import api from "../../../api/axios";
import { Link } from "react-router";
import introimg from '../../../../public/icon.jpeg';

const Prediction = () => {
  const [data, setData] = useState(null);
  const [countdown, setCountdown] = useState(30);
  const [showWeb, setShowWeb] = useState(false);
 const [isExpanded, setIsExpanded] = useState(false); 
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
      const seconds = now.getSeconds();
    
      const currentRemaining = seconds < 30 ? 30 - seconds : 60 - seconds;
      setCountdown(currentRemaining);
      if (currentRemaining === 30) {
        fetchDynamicData();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!data)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-cyan-500 mt-2 font-mono text-[10px] tracking-widest uppercase">
          Syncing...
        </p>
      </div>
    );

  const getStatusColor = (colorName) => {
    const c = colorName?.toLowerCase();
    if (c?.includes("red")) return "from-red-500 to-red-600";
    if (c?.includes("green")) return "from-green-500 to-green-600";
    if (c?.includes("violet")) return "from-purple-500 to-purple-600";
    return "from-cyan-500 to-blue-500";
  };

  const isBig = data.prediction?.toUpperCase() === "BIG";
  const glowColor = data.color?.toLowerCase().includes("red")
    ? "rgba(239, 68, 68, 0.3)"
    : "rgba(34, 197, 94, 0.3)";

  const generatePeriodId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    const seconds = now.getSeconds();
    const serial = totalMinutes * 2 + (seconds >= 30 ? 2 : 1);
    const serialStr = String(serial).padStart(4, "0");
    return `${dateStr}1000${serialStr}`;
  };


  
  return (
    <div className="rounded-2xl bg-[#050505] text-slate-200 p-2 sm:p-6 font-sans overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-3">
        {/* --- MAIN PANEL --- */}
        <div
          className={`flex-grow space-y-3 ${showWeb ? "lg:w-[40%]" : "w-full"}`}
        >
          {/* Top Bar - Very Small on Mobile */}
          <div className="flex justify-between items-center bg-white/5 p-2 px-3 rounded-lg border border-white/10">
            <div className="flex items-center gap-2">
              <Activity className="text-cyan-400" size={14} />
              <div>
                <div className="leading-tight flex gap-2 justify-center items-center">
                         <img 
                            src={introimg} 
                            alt="Icon" 
                            className='rounded-full mb-4 w-15 h-15 object-cover border-2 border-primary/30 shadow-lg' 
                          />
                       
                <h2 className="text-lg font-bold text-cyan-500 uppercase">
                  RS COMMUNITY CENTER
                </h2>
              </div>
                <span className="text-sm text-white/80 font-mono uppercase">
                  Status: Live
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowWeb(!showWeb)}
              className="flex items-center gap-1 bg-white/10 hover:bg-cyan-500/20 px-3 py-1 rounded-md border border-white/5 transition-all"
            >
              {showWeb ? (
                <X size={12} className="text-red-400" />
              ) : (
                <Globe size={12} className="text-cyan-400" />
              )}
              <span className="text-[8px] font-bold uppercase">
                {showWeb ? "Close" : "Market"}
              </span>
            </button>
          </div>

          {/* Center Cards - Compact Layout */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {/* Prediction Card */}
            <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/10 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-16 h-16 blur-2xl opacity-10"
                style={{ backgroundColor: glowColor }}
              />
              <p className="text-md font-bold text-white/80 tracking-widest mb-1 uppercase">
                Prediction
              </p>
              <h1
                className={`text-3xl sm:text-5xl font-black italic ${isBig ? "text-orange-500" : "text-cyan-400"}`}
              >
                {data.prediction}
              </h1>
              <div className="mt-2 flex justify-between items-center gap-1.5">
                <span className="text-sm text-white/80font-mono font-bold tracking-tighter">
                  P-{generatePeriodId()}
                </span>
                <div className="flex justify-center items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${getStatusColor(data.color)}`}
                    title={data.color}
                  />
                  <h1 className="text-white/80">{data.color}</h1>
                </div>
              </div>
            </div>

            {/* Target Number Card */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col justify-center text-center">
              <p className="text-md font-bold text-white/80 tracking-widest uppercase">
                Target No.
              </p>
              <h3 className="text-3xl sm:text-5xl font-black text-white">
                {data.resultNumber?.toString().padStart(2, "0")}
              </h3>
              <div className="mt-2 flex justify-between text-sm font-mono text-white/80 uppercase">
                <span>Acc: {data.confidence}%</span>
                <div className="flex items-center gap-1">
               <span className="text-orange-500 font-black">
                 00:{String(countdown).padStart(2, "0")}
               </span>
               <span className="text-[10px] opacity-40">s</span>
            </div>
              </div>
            </div>
          </div>

          {/* History Section - Multi-row on small mobile */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <LayoutGrid size={12} className="text-cyan-500/50" />
              <h3 className="text-md font-bold text-white/80 uppercase tracking-widest">
                Recent
              </h3>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {data.lastUpdates?.slice(0, 10).map((item, idx) => {
                const itemIsBig = item.includes("B");
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center py-1.5 bg-black/40 rounded-md border border-white/5"
                  >
                    <span
                      className={`text-sm font-bold font-mono ${itemIsBig ? "text-orange-500/80" : "text-cyan-400/80"}`}
                    >
                      {item.replace(/\D/g, "").padStart(2, "0")}
                    </span>
                    <span className="text-[6px] font-bold opacity-20">
                      {itemIsBig ? "B" : "S"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

    {/* --- MARKET PANEL (Bottom Half / Split Screen) --- */}
      <AnimatePresence>
        {showWeb && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`flex flex-col bg-white border-t-2 border-cyan-500 shadow-2xl z-50 ${isExpanded ? "h-full" : "h-[80%]"}`}
          >
            {/* Market Control Bar */}
            <div className="bg-[#111] p-2 flex justify-between items-center px-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase">DK WIN LIVE</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-cyan-500">
                  {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button onClick={() => setShowWeb(false)} className="text-red-500">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="flex-grow bg-white">
              <iframe 
                src="https://dkwin9.com/#/register?invitationCode=23478531386" 
                className="w-full h-full"
                title="Market Access"
                // 'allow-top-navigation' বাদ দেওয়া হয়েছে যাতে মেইন সাইট রিলোড না হয়
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default Prediction;
