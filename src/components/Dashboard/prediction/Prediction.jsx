import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, ShieldCheck, History } from "lucide-react";
import introimg from "../../../../public/icon.jpeg";

/* ================= PREDICTION DATA (100 ITEMS) ================= */
const PREDICTION_DATA = [
    { "period": "00", "number": 8, "size": "Big", "color": "Red" },
    { "period": "01", "number": 8, "size": "Big", "color": "Red" },
    { "period": "02", "number": 0, "size": "Small", "color": "Red-Violet" },
    { "period": "03", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "04", "number": 4, "size": "Small", "color": "Red" },
    { "period": "05", "number": 3, "size": "Small", "color": "Green" },
    { "period": "06", "number": 1, "size": "Small", "color": "Green" },
    { "period": "07", "number": 4, "size": "Small", "color": "Red" },
    { "period": "08", "number": 8, "size": "Big", "color": "Red" },
    { "period": "09", "number": 2, "size": "Small", "color": "Red" },
    { "period": "10", "number": 1, "size": "Small", "color": "Green" },
    { "period": "11", "number": 9, "size": "Big", "color": "Green" },
    { "period": "12", "number": 0, "size": "Small", "color": "Red-Violet" },
    { "period": "13", "number": 8, "size": "Big", "color": "Red" },
    { "period": "14", "number": 4, "size": "Small", "color": "Red" },
    { "period": "15", "number": 4, "size": "Small", "color": "Red" },
    { "period": "16", "number": 9, "size": "Big", "color": "Green" },
    { "period": "17", "number": 1, "size": "Small", "color": "Green" },
    { "period": "18", "number": 4, "size": "Small", "color": "Red" },
    { "period": "19", "number": 8, "size": "Big", "color": "Red" },
    { "period": "20", "number": 9, "size": "Big", "color": "Green" },
    { "period": "21", "number": 9, "size": "Big", "color": "Green" },
    { "period": "22", "number": 3, "size": "Small", "color": "Green" },
    { "period": "23", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "24", "number": 3, "size": "Small", "color": "Green" },
    { "period": "25", "number": 6, "size": "Big", "color": "Red" },
    { "period": "26", "number": 9, "size": "Big", "color": "Green" },
    { "period": "27", "number": 0, "size": "Small", "color": "Red-Violet" },
    { "period": "28", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "29", "number": 9, "size": "Big", "color": "Green" },
    { "period": "30", "number": 2, "size": "Small", "color": "Red" },
    { "period": "31", "number": 1, "size": "Small", "color": "Green" },
    { "period": "32", "number": 7, "size": "Big", "color": "Green" },
    { "period": "33", "number": 9, "size": "Big", "color": "Green" },
    { "period": "34", "number": 8, "size": "Big", "color": "Red" },
    { "period": "35", "number": 0, "size": "Small", "color": "Red-Violet" },
    { "period": "36", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "37", "number": 1, "size": "Small", "color": "Green" },
    { "period": "38", "number": 3, "size": "Small", "color": "Green" },
    { "period": "39", "number": 4, "size": "Small", "color": "Red" },
    { "period": "40", "number": 2, "size": "Small", "color": "Red" },
    { "period": "41", "number": 0, "size": "Small", "color": "Red-Violet" },
    { "period": "42", "number": 1, "size": "Small", "color": "Green" },
    { "period": "43", "number": 0, "size": "Small", "color": "Red-Violet" },
    { "period": "44", "number": 1, "size": "Small", "color": "Green" },
    { "period": "45", "number": 0, "size": "Small", "color": "Red-Violet" },
    { "period": "46", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "47", "number": 8, "size": "Big", "color": "Red" },
    { "period": "48", "number": 6, "size": "Big", "color": "Red" },
    { "period": "49", "number": 1, "size": "Small", "color": "Green" },
    { "period": "50", "number": 1, "size": "Small", "color": "Green" },
    { "period": "51", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "52", "number": 2, "size": "Small", "color": "Red" },
    { "period": "53", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "54", "number": 6, "size": "Big", "color": "Red" },
    { "period": "55", "number": 2, "size": "Small", "color": "Red" },
    { "period": "56", "number": 8, "size": "Big", "color": "Red" },
    { "period": "57", "number": 0, "size": "Small", "color": "Red-Violet" },
    { "period": "58", "number": 1, "size": "Small", "color": "Green" },
    { "period": "59", "number": 1, "size": "Small", "color": "Green" },
    { "period": "60", "number": 7, "size": "Big", "color": "Green" },
    { "period": "61", "number": 2, "size": "Small", "color": "Red" },
    { "period": "62", "number": 9, "size": "Big", "color": "Green" },
    { "period": "63", "number": 4, "size": "Small", "color": "Red" },
    { "period": "64", "number": 8, "size": "Big", "color": "Red" },
    { "period": "65", "number": 2, "size": "Small", "color": "Red" },
    { "period": "66", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "67", "number": 9, "size": "Big", "color": "Green" },
    { "period": "68", "number": 6, "size": "Big", "color": "Red" },
    { "period": "69", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "70", "number": 1, "size": "Small", "color": "Green" },
    { "period": "71", "number": 7, "size": "Big", "color": "Green" },
    { "period": "72", "number": 9, "size": "Big", "color": "Green" },
    { "period": "73", "number": 8, "size": "Big", "color": "Red" },
    { "period": "74", "number": 6, "size": "Big", "color": "Red" },
    { "period": "75", "number": 8, "size": "Big", "color": "Red" },
    { "period": "76", "number": 0, "size": "Small", "color": "Red-Violet" },
    { "period": "77", "number": 3, "size": "Small", "color": "Green" },
    { "period": "78", "number": 7, "size": "Big", "color": "Green" },
    { "period": "79", "number": 3, "size": "Small", "color": "Green" },
    { "period": "80", "number": 1, "size": "Small", "color": "Green" },
    { "period": "81", "number": 6, "size": "Big", "color": "Red" },
    { "period": "82", "number": 3, "size": "Small", "color": "Green" },
    { "period": "83", "number": 3, "size": "Small", "color": "Green" },
    { "period": "84", "number": 7, "size": "Big", "color": "Green" },
    { "period": "85", "number": 6, "size": "Big", "color": "Red" },
    { "period": "86", "number": 7, "size": "Big", "color": "Green" },
    { "period": "87", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "88", "number": 1, "size": "Small", "color": "Green" },
    { "period": "89", "number": 7, "size": "Big", "color": "Green" },
    { "period": "90", "number": 7, "size": "Big", "color": "Green" },
    { "period": "91", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "92", "number": 2, "size": "Small", "color": "Red" },
    { "period": "93", "number": 3, "size": "Small", "color": "Green" },
    { "period": "94", "number": 3, "size": "Small", "color": "Green" },
    { "period": "95", "number": 7, "size": "Big", "color": "Green" },
    { "period": "96", "number": 2, "size": "Small", "color": "Red" },
    { "period": "97", "number": 5, "size": "Big", "color": "Green-Violet" },
    { "period": "98", "number": 6, "size": "Big", "color": "Red" },
    { "period": "99", "number": 5, "size": "Big", "color": "Green-Violet" }
];
const START_INDEX = 92;

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
        const totalSeconds = seconds + (milliseconds / 1000);
        const remain = Math.ceil(30 - (totalSeconds % 30));
        setCountdown(remain === 0 ? 30 : remain);

        // ২. পিরিয়ড ক্যালকুলেশন
        const totalSecondsInDay = (now.getHours() * 3600) + (now.getMinutes() * 60) + seconds;
        const periodPassed = Math.floor(totalSecondsInDay / 30);

        // ৩. আপনার START_INDEX অনুযায়ী পিরিয়ড নির্ধারণ
        // এটি আপনার ১০০টি ডাটার (00-99) মধ্যে লুপ করবে
        const dataIdx = (START_INDEX + periodPassed) % 100;
        setCurrentPeriodIndex(dataIdx);

        // ৪. পিরিয়ড আইডি ফরম্যাট (YYYYMMDD...XX)
        const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
        const formattedIdx = String(dataIdx).padStart(2, "0");
        
        // ফাইনাল আইডি যা UI-তে দেখাবে: 20260401...95
        const finalId = `${dateStr}...${formattedIdx}`; 
        setFullPeriodId(finalId);
    };

    useEffect(() => {
        updateGameState();
        // ৫০০ মিলি-সেকেন্ড পর পর চেক করবে যাতে ঘড়ি একুরেট থাকে
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

    const getIndicatorColor = (colorName) => {
        if (colorName.includes("Red")) return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]";
        if (colorName.includes("Green")) return "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]";
        if (colorName.includes("Violet")) return "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]";
        return "bg-gray-500";
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-black text-slate-200">
            {/* MAIN UI */}
            <div className={`${showWeb ? (isExpanded ? "hidden" : "h-[40vh]") : "flex-1"} transition-all duration-300 p-3 space-y-3 overflow-y-auto`}>
                
                {/* HEADER */}
                <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-lg">
                    <div className="flex items-center gap-3">
                        <img src={introimg} className="w-8 h-8 rounded-full border border-cyan-400/40" alt="logo" />
                        <h2 className="text-cyan-400 font-extrabold tracking-wide text-sm md:text-base">R(S) COMMUNITY</h2>
                    </div>
                    <button onClick={() => setShowWeb(!showWeb)} className="bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-1.5 text-xs font-bold rounded-full shadow-md transition">
                        {showWeb ? "Hide" : "Market"}
                    </button>
                </div>

                {/* PREDICTION + TIMER */}
                <div className="grid grid-cols-2 gap-3">
                    {/* PREDICTION CARD */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 ${currentData.size === "Big" ? "bg-orange-500" : "bg-cyan-400"}`} />
                        <p className="text-xs text-white/60 uppercase">Prediction</p>
                        <h1 className={`text-3xl md:text-4xl font-black mt-1 ${currentData.size === "Big" ? "text-orange-400" : "text-cyan-400"}`}>
                            {currentData.size}
                        </h1>
                        <p className="text-[10px] font-mono mt-2 text-white/70 break-all leading-tight">
                            P-{fullPeriodId}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className={`w-3 h-3 rounded-full ${getIndicatorColor(currentData.color)}`} />
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
                        <span className="flex items-center gap-1 text-white/70"><History size={12}/> History</span>
                        <span className="text-green-400 flex items-center gap-1 font-semibold"><ShieldCheck size={12}/> Smart</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {historyData.map((item, i) => (
                            <div key={i} className="flex flex-col items-center bg-white/5 p-2 rounded-lg border border-white/5">
                                <span className={`text-sm font-bold ${item.size === "Big" ? "text-orange-400" : "text-cyan-400"}`}>{item.number}</span>
                                <div className={`w-2 h-2 mt-1 rounded-full ${getIndicatorColor(item.color)}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* LIVE MARKET IFRAME */}
            <AnimatePresence>
                {showWeb && (
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        className={`fixed bottom-0 left-0 w-full bg-white z-50 rounded-t-2xl overflow-hidden ${isExpanded ? "h-full" : "h-[80vh]"}`}>
                        <div className="bg-black text-white p-3 flex justify-between items-center">
                            <span className="text-xs font-bold">LIVE MARKET</span>
                            <div className="flex gap-3">
                                <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}</button>
                                <button onClick={() => setShowWeb(false)}><X size={18}/></button>
                            </div>
                        </div>
                        <iframe src="https://dkwin9.com/#/register?invitationCode=23478531386" className="w-full h-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Prediction;