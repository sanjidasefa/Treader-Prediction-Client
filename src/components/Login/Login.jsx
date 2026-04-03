import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../firebase/firebase.config"; 
import { Eye, EyeOff, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import {  Loader2 } from 'lucide-react'; 

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password show/hide state
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const docRef = doc(db, "auth", "codes");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { adminCode, userCode } = docSnap.data();
        const input = data.traderCode;

        if (input === adminCode || input === userCode) {
          const role = (input === adminCode) ? "admin" : "user";
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("userRole", role);
          sessionStorage.setItem("userName", role === "admin" ? "Shifat Hosane Mahim" : "RS VIP Member");

          alert(`Welcome ${role === "admin" ? 'Admin' : 'VIP Member'}!`);
          navigate('/dashboard'); 
        } else {
          alert("❌ Invalid Trader Code! Try again.");
        }
      } else {
        alert("⚠️ Configuration missing in Firebase!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("🌐 Network Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-md mx-auto p-8 bg-white/5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full space-y-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold iosevka-charon-bold tracking-tight">System Login</h2>
          <p className="text-xs opacity-50 iosevka-charon-light">Enter your unique identification code</p>
        </div>
        
        <div className="flex flex-col gap-4">
          {/* Input Wrapper for Eye Icon */}
          <div className="relative group">
            <input 
              type={showPassword ? "text" : "password"} // Dynamic type change
              placeholder="TRADER CODE" 
              disabled={loading}
              {...register("traderCode", { required: "Code is required" })}
              className={`input input-bordered w-full bg-white/10 border-white/20 focus:border-primary text-center tracking-[0.2em] font-mono iosevka-charon-bold pr-12 ${errors.traderCode ? 'border-error' : ''}`}
            />
            
            {/* Eye Icon Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          

<motion.button 
  type="submit" 
  disabled={loading}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className={`
    relative w-full h-10 overflow-hidden rounded-sm font-bold uppercase tracking-[0.15em] transition-all
    ${loading 
      ? 'bg-primary/50 cursor-not-allowed' 
      : 'bg-primary hover:shadow-[0_0_20px_rgba(var(--p),0.4)] text-black shadow-lg shadow-primary/20'
    }
  `}
>
  <div className="flex items-center justify-center gap-3">
    {loading ? (
      <>
        <Loader2 size={20} className="animate-spin" />
        <span className="iosevka-charon-bold text-sm">Verifying...</span>
      </>
    ) : (
      <>
        <Lock size={18} className="opacity-80" />
        <span className="iosevka-charon-bold text-base">Access Dashboard</span>
      </>
    )}
  </div>
  {!loading && (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
    />
  )}
</motion.button>
        </div>
        {errors.traderCode && (
          <p className="text-error text-center text-xs font-medium">{errors.traderCode.message}</p>
        )}
        <div className="divider opacity-10"></div>
        <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 iosevka-charon-light-italic text-center">
          Secure Access • R(S) Community Center
        </p>
      </form>
    </div>
  );
};

export default Login;