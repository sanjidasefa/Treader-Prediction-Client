import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, ShieldCheck, History } from "lucide-react";
import introimg from "../../../../public/icon.jpeg";

const PREDICTION_DATA = [
  { period: "00", number: 3, size: "Small", color: "Green" },
  { period: "01", number: 0, size: "Small", color: "Red-Violet" },
  { period: "02", number: 6, size: "Big", color: "Red" },
  { period: "03", number: 6, size: "Big", color: "Red" },
  { period: "04", number: 0, size: "Small", color: "Red-Violet" },
  { period: "05", number: 8, size: "Big", color: "Red" },
  { period: "06", number: 2, size: "Small", color: "Red" },
  { period: "07", number: 5, size: "Big", color: "Green-Violet" },
  { period: "08", number: 7, size: "Big", color: "Green" },
  { period: "09", number: 5, size: "Big", color: "Green-Violet" },
  { period: "10", number: 8, size: "Big", color: "Red" },
  { period: "11", number: 3, size: "Small", color: "Green" },
  { period: "12", number: 1, size: "Small", color: "Green" },
  { period: "13", number: 2, size: "Small", color: "Red" },
  { period: "14", number: 6, size: "Big", color: "Red" },
  { period: "15", number: 5, size: "Big", color: "Green-Violet" },
  { period: "16", number: 1, size: "Small", color: "Green" },
  { period: "17", number: 0, size: "Small", color: "Red-Violet" },
  { period: "18", number: 6, size: "Big", color: "Red" },
  { period: "19", number: 0, size: "Small", color: "Red-Violet" },
  { period: "20", number: 1, size: "Small", color: "Green" },
  { period: "21", number: 3, size: "Small", color: "Green" },
  { period: "22", number: 3, size: "Small", color: "Green" },
  { period: "23", number: 0, size: "Small", color: "Red-Violet" },
  { period: "24", number: 1, size: "Small", color: "Green" },
  { period: "25", number: 1, size: "Small", color: "Green" },
  { period: "26", number: 1, size: "Small", color: "Green" },
  { period: "27", number: 7, size: "Big", color: "Green" },
  { period: "28", number: 0, size: "Small", color: "Red-Violet" },
  { period: "29", number: 5, size: "Big", color: "Green-Violet" },
  { period: "30", number: 1, size: "Small", color: "Green" },
  { period: "31", number: 7, size: "Big", color: "Green" },
  { period: "32", number: 8, size: "Big", color: "Red" },
  { period: "33", number: 9, size: "Big", color: "Green" },
  { period: "34", number: 5, size: "Big", color: "Green-Violet" },
  { period: "35", number: 4, size: "Small", color: "Red" },
  { period: "36", number: 2, size: "Small", color: "Red" },
  { period: "37", number: 6, size: "Big", color: "Red" },
  { period: "38", number: 3, size: "Small", color: "Green" },
  { period: "39", number: 4, size: "Small", color: "Red" },
  { period: "40", number: 5, size: "Big", color: "Green-Violet" },
  { period: "41", number: 5, size: "Big", color: "Green-Violet" },
  { period: "42", number: 7, size: "Big", color: "Green" },
  { period: "43", number: 4, size: "Small", color: "Red" },
  { period: "44", number: 5, size: "Big", color: "Green-Violet" },
  { period: "45", number: 2, size: "Small", color: "Red" },
  { period: "46", number: 0, size: "Small", color: "Red-Violet" },
  { period: "47", number: 1, size: "Small", color: "Green" },
  { period: "48", number: 3, size: "Small", color: "Green" },
  { period: "49", number: 2, size: "Small", color: "Red" },
  { period: "50", number: 1, size: "Small", color: "Green" },
  { period: "51", number: 8, size: "Big", color: "Red" },
  { period: "52", number: 7, size: "Big", color: "Green" },
  { period: "53", number: 0, size: "Small", color: "Red-Violet" },
  { period: "54", number: 9, size: "Big", color: "Green" },
  { period: "55", number: 6, size: "Big", color: "Red" },
  { period: "56", number: 4, size: "Small", color: "Red" },
  { period: "57", number: 5, size: "Big", color: "Green-Violet" },
  { period: "58", number: 4, size: "Small", color: "Red" },
  { period: "59", number: 3, size: "Small", color: "Green" },
  { period: "60", number: 5, size: "Big", color: "Green-Violet" },
  { period: "61", number: 7, size: "Big", color: "Green" },
  { period: "62", number: 1, size: "Small", color: "Green" },
  { period: "63", number: 6, size: "Big", color: "Red" },
  { period: "64", number: 6, size: "Big", color: "Red" },
  { period: "65", number: 7, size: "Big", color: "Green" },
  { period: "66", number: 6, size: "Big", color: "Red" },
  { period: "67", number: 2, size: "Small", color: "Red" },
  { period: "68", number: 9, size: "Big", color: "Green" },
  { period: "69", number: 5, size: "Big", color: "Green-Violet" },
  { period: "70", number: 2, size: "Small", color: "Red" },
  { period: "71", number: 0, size: "Small", color: "Red-Violet" },
  { period: "72", number: 2, size: "Small", color: "Red" },
  { period: "73", number: 7, size: "Big", color: "Green" },
  { period: "74", number: 0, size: "Small", color: "Red-Violet" },
  { period: "75", number: 8, size: "Big", color: "Red" },
  { period: "76", number: 0, size: "Small", color: "Red-Violet" },
  { period: "77", number: 8, size: "Big", color: "Red" },
  { period: "78", number: 4, size: "Small", color: "Red" },
  { period: "79", number: 8, size: "Big", color: "Red" },
  { period: "80", number: 3, size: "Small", color: "Green" },
  { period: "81", number: 6, size: "Big", color: "Red" },
  { period: "82", number: 5, size: "Big", color: "Green-Violet" },
  { period: "83", number: 8, size: "Big", color: "Red" },
  { period: "84", number: 6, size: "Big", color: "Red" },
  { period: "85", number: 0, size: "Small", color: "Red-Violet" },
  { period: "86", number: 4, size: "Small", color: "Red" },
  { period: "87", number: 2, size: "Small", color: "Red" },
  { period: "88", number: 0, size: "Small", color: "Red-Violet" },
  { period: "89", number: 0, size: "Small", color: "Red-Violet" },
  { period: "90", number: 2, size: "Small", color: "Red" },
  { period: "91", number: 8, size: "Big", color: "Red" },
  { period: "92", number: 8, size: "Big", color: "Red" },
  { period: "93", number: 9, size: "Big", color: "Green" },
  { period: "94", number: 2, size: "Small", color: "Red" },
  { period: "95", number: 0, size: "Small", color: "Red-Violet" },
  { period: "96", number: 6, size: "Big", color: "Red" },
  { period: "97", number: 9, size: "Big", color: "Green" },
  { period: "98", number: 8, size: "Big", color: "Red" },
  { period: "99", number: 0, size: "Small", color: "Red-Violet" },
];
const START_INDEX = 42;

const Prediction = () => {
  const [countdown, setCountdown] = useState(30);
  const [fullPeriodId, setFullPeriodId] = useState("");
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
  const [showWeb, setShowWeb] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const updateGameState = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    // ১. টাইমিং সিঙ্ক (মিলি-সেকেন্ডসহ যাতে স্লো না হয়)
    const totalSeconds = seconds + milliseconds / 1000;
    const remain = Math.ceil(30 - (totalSeconds % 30));
    setCountdown(remain === 0 ? 30 : remain);
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // প্রতি মিনিটে ২টি স্লট (০-২৯ এবং ৩০-৫৯)
    const slotInMinute = Math.floor(currentSecond / 30);
    const totalSlotsSinceHourStart = currentMinute * 2 + slotInMinute;

    // START_INDEX এর সাথে এটি যোগ হবে যাতে ডাটা পরিবর্তন হয়
    // আপনি যদি চান ডাটা একদম ফিক্সড থাকুক, তবে শুধু START_INDEX ব্যবহার করতে পারেন
    const dataIdx = (START_INDEX + totalSlotsSinceHourStart) % 100;
    setCurrentPeriodIndex(dataIdx);

    // ৩. পিরিয়ড আইডি ফরম্যাট (YYYYMMDD...XX)
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

    // PREDICTION_DATA থেকে সরাসরি পিরিয়ড নম্বর নেওয়া
    const periodNumber = PREDICTION_DATA[dataIdx]?.period || "00";
    const finalId = `${dateStr}...${periodNumber}`;
    setFullPeriodId(finalId);
  };

  useEffect(() => {
    updateGameState();
    const timer = setInterval(updateGameState, 500);
    return () => clearInterval(timer);
  }, []);

  // ডাটা সেট করা
  const currentData = PREDICTION_DATA[currentPeriodIndex] || PREDICTION_DATA[0];

  // হিস্ট্রি ডাটা (আগের ৫টি)
  const historyData = useMemo(() => {
    const history = [];
    for (let i = 1; i <= 5; i++) {
      let idx = (currentPeriodIndex - i + 100) % 100;
      history.push(PREDICTION_DATA[idx]);
    }
    return history;
  }, [currentPeriodIndex]);

  const getIndicatorColor = (color) => {
    switch (color) {
      case "Green":
        return "bg-green-500";
      case "Red":
        return "bg-red-500";
      case "Red-Violet":
        return "bg-gradient-to-r from-red-500 to-purple-500";
      case "Green-Violet":
        return "bg-gradient-to-r from-green-500 to-purple-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className=" flex flex-col bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-black text-slate-200">
      <div
        className={`${showWeb ? (isExpanded ? "hidden" : "h-[40vh]") : "flex-1"} transition-all duration-300 p-3 space-y-3 overflow-y-auto`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <img
              src={introimg}
              className="w-8 h-8 rounded-full border border-cyan-400/40"
              alt="logo"
            />
            <h2 className="text-cyan-400 font-extrabold tracking-wide text-sm md:text-base">
              R(S) COMMUNITY
            </h2>
          </div>
          <button
            onClick={() => setShowWeb(!showWeb)}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-1.5 text-xs font-bold rounded-full shadow-md transition"
          >
            {showWeb ? "Hide" : "Market"}
          </button>
        </div>

        {/* PREDICTION + TIMER */}
        <div className="grid grid-cols-2 gap-3">
          {/* PREDICTION CARD */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg relative overflow-hidden">
            <div
              className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 ${currentData.size === "Big" ? "bg-orange-500" : "bg-cyan-400"}`}
            />
            <p className="text-xs text-white/60 uppercase">Prediction</p>
            <h1
              className={`text-3xl md:text-4xl font-black mt-1 ${currentData.size === "Big" ? "text-orange-400" : "text-cyan-400"}`}
            >
              {currentData.size}
            </h1>
            <p className="text-[10px] font-mono mt-2 text-white/70 break-all leading-tight">
              P-{fullPeriodId}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`w-3 h-3 rounded-full ${getIndicatorColor(currentData.color)}`}
              />
              <span className="text-xs font-semibold">{currentData.color}</span>
            </div>
          </div>

          {/* TIMER CARD */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
            <div>
              <p className="text-xs text-white/60 uppercase">Timer</p>
              <h2 className="text-3xl md:text-4xl font-mono text-orange-400 mt-1">
                00:{String(countdown).padStart(2, "0")}
              </h2>
            </div>
            <div className="mt-4 border-t border-white/10 pt-2 flex justify-between items-center">
              <span className="text-xs text-white/60">Target</span>
              <span className="text-lg font-bold">{currentData.number}</span>
            </div>
          </div>
        </div>

        {/* HISTORY */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="flex items-center gap-1 text-white/70">
              <History size={12} /> History
            </span>
            <span className="text-green-400 flex items-center gap-1 font-semibold">
              <ShieldCheck size={12} /> Smart
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {historyData.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white/5 p-2 rounded-lg border border-white/5"
              >
                <span
                  className={`text-sm font-bold ${item.size === "Big" ? "text-orange-400" : "text-cyan-400"}`}
                >
                  {item.number}
                </span>
                <div
                  className={`w-2 h-2 mt-1 rounded-full ${getIndicatorColor(item.color)}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIVE MARKET IFRAME */}
      <AnimatePresence>
        {showWeb && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 600 }}
            dragElastic={0.1}
            className="fixed bottom-0 left-0 w-full bg-[#0a0a0a] z-[100] rounded-t-[30px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/10 overflow-hidden h-[85vh] flex flex-col" // এখানে flex-col যোগ করা হয়েছে
          >
            {/* DRAG HANDLE & HEADER - Fixed height (যেমন h-16) */}
            <div className="w-full flex flex-col items-center py-3 cursor-grab active:cursor-grabbing bg-black/50 backdrop-blur-md shrink-0">
              <div className="w-16 h-1.5 bg-white/20 rounded-full mb-2" />
              <div className="flex justify-between items-center w-full px-6">
                <span className="text-[10px] font-bold text-white/50 tracking-[0.2em]">
                  LIVE MARKET
                </span>
                <button
                  onClick={() => setShowWeb(false)}
                  className="text-white/40 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            {/* IFRAME CONTENT - flex-1 দিলে এটি বাকি সবটুকু জায়গা নিবে */}
            <div className="flex-1 w-full overflow-hidden pb-5">
              {" "}
              {/* pb-5 দেওয়া হয়েছে যাতে একদম নিচে একটু গ্যাপ থাকে */}
              <iframe
                src="https://21bdwin24.com/register?inviteCode=BHGMRNW&from=web"
                className="w-full h-full border-none"
                title="Market Site"
                style={{ height: "100%", minHeight: "100%" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Prediction;
