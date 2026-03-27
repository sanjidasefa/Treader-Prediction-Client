import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Database, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../../../api/axios';

const LogicCentral = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      size: 'Big',
      color: 'Red',
      period: "00"
    }
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    setStatus({ type: '', msg: '' });
    
    try {
      const payload = {
        ...formData,
        number: Number(formData.number),
        timestamp: new Date(),
        isHistory: false // Eita must thakte hobe jate prediction dashboard e data ashe
      };

      const response = await api.post('/prediction', payload);
      
      if (response.data) {
        setStatus({ type: 'success', msg: 'Data Pushed Successfully!' });
        reset(); 
      }
    } catch (error) {
      console.error("Post Error:", error);
      setStatus({ type: 'error', msg: 'Failed to connect to server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    // 'min-h-screen' er bodole 'h-[90vh]' use koro jodi layout e sidebar thake
    <div className="flex items-center justify-center p-4 bg-[#050505] min-h-screen">
      <div className="w-full max-w-md bg-[#111] border border-white/20 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"> 
        
        {/* Header - Fixed Text Color */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 mb-3 border border-cyan-500/20">
            <Database size={28} />
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Admin Logic</h1>
          <p className="text-[10px] text-cyan-500 font-bold tracking-[0.3em] uppercase mt-2">Database Control</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Number Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block ml-1">Target Number (0-9)</label>
            <input 
              type="number" 
              placeholder="Enter Number"
              {...register("number", { required: true, min: 0, max: 9 })}
              className="w-full bg-white/5 border border-white/10 p-4 text-white text-2xl font-mono text-center rounded-xl focus:border-cyan-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Size Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block ml-1">Size</label>
              <select {...register("size")} className="w-full bg-white/5 border border-white/10 p-3 text-white rounded-xl text-sm outline-none focus:border-cyan-500">
                <option value="Big" className="bg-[#111]">Big</option>
                <option value="Small" className="bg-[#111]">Small</option>
              </select>
            </div>

            {/* Color Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block ml-1">Color</label>
              <select {...register("color")} className="w-full bg-white/5 border border-white/10 p-3 text-white rounded-xl text-sm outline-none focus:border-cyan-500">
                <option value="Red" className="bg-[#111]">Red</option>
                <option value="Green" className="bg-[#111]">Green</option>
                <option value="Violet" className="bg-[#111]">Violet</option>
              </select>
            </div>
          </div>

          {/* Status Alert */}
          {status.msg && (
            <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-3 border ${status.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
              {status.type === 'success' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
              {status.msg}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full h-14 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${loading ? 'bg-gray-700 text-gray-400' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'}`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={16} />
                <span>Update Database</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogicCentral;