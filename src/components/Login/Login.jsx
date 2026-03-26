import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../firebase/firebase.config"; 

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const docRef = doc(db, "auth", "codes");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { adminCode, userCode } = docSnap.data();
        const input = data.traderCode;

        // User Input matching logic
        if (input === adminCode || input === userCode) {
          const role = (input === adminCode) ? "admin" : "user";
          
          // Session storage e save kora
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userRole", role);
          localStorage.setItem("userName", role === "admin" ? "Shifat Hosane Mahim" : "RS VIP Member");

          alert(`Welcome ${role === "admin" ? 'Admin' : 'VIP Member'}!`);
          navigate('/dashboard'); 
        } else {
          alert("❌ Invalid Trader Code! Try again.");
        }
      } else {
        alert("⚠️ Configuration missing in Firebase! Please add 'auth/codes' in Firestore.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("🌐 Network Error! Check your connection.");
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
          <input 
            type="password" 
            placeholder="TRADER CODE" 
            disabled={loading}
            {...register("traderCode", { required: "Code is required" })}
            className={`input input-bordered w-full bg-white/10 border-white/20 focus:border-primary text-center tracking-[0.2em] font-mono iosevka-charon-bold ${errors.traderCode ? 'border-error' : ''}`}
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className={`btn btn-primary w-full shadow-lg shadow-primary/20 ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </button>
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