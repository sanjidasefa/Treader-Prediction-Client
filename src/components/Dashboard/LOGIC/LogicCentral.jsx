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
      period: "00" // Tomar data te period "00" silo
    }
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    setStatus({ type: '', msg: '' });
    
    try {
      // Data format kora jate MongoDB schema r sathe mile
      const payload = {
        ...formData,
        number: Number(formData.number), // String ke number e convert kora
        timestamp: new Date()
      };

      const response = await api.post('/prediction', payload);
      
      if (response.data) {
        setStatus({ type: 'success', msg: 'Data Pushed to MongoDB!' });
        reset(); 
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'Sync Failed! Check Server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] p-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-3">
            <Database size={24} />
          </div>
          <h1 className="text-xl font-black text-white uppercase tracking-tight">Admin Logic Panel</h1>
          <p className="text-[9px] text-white/30 tracking-[0.3em] uppercase mt-1">Manual Database Override</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Number Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Target Number</label>
            <input 
              type="number" 
              placeholder="8"
              {...register("number", { required: "Number is required", min: 0, max: 9 })}
              className="input input-bordered w-full bg-white/5 border-white/10 text-white text-xl font-mono text-center rounded-xl focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Size Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Size</label>
              <select {...register("size")} className="select select-bordered w-full bg-white/5 border-white/10 text-white rounded-xl text-xs">
                <option value="Big">Big</option>
                <option value="Small">Small</option>
              </select>
            </div>

            {/* Color Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Color</label>
              <select {...register("color")} className="select select-bordered w-full bg-white/5 border-white/10 text-white rounded-xl text-xs">
                <option value="Red">Red</option>
                <option value="Green">Green</option>
                <option value="Violet">Violet</option>
              </select>
            </div>
          </div>

          {/* Period Input (Optional but useful) */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Period ID</label>
            <input 
              type="text" 
              {...register("period")}
              className="input input-bordered w-full bg-white/5 border-white/10 text-white font-mono text-center text-xs rounded-xl"
            />
          </div>

          {/* Feedback Message */}
          {status.msg && (
            <div className={`p-3 rounded-lg text-[10px] font-bold flex items-center gap-2 ${status.type === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
              {status.type === 'success' ? <CheckCircle2 size={14}/> : <AlertCircle size={14}/>}
              {status.msg}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`btn btn-primary w-full rounded-xl border-none font-bold uppercase tracking-widest text-xs h-12 ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Sending...' : 'Update Prediction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogicCentral;