import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Trader Code:", data.traderCode);
    if (data.traderCode === "SHIFAT123") {
      alert("Success! Welcome Shifat Hosane Mahim.");
    } else {
      alert("Invalid Code!");
    }
  };

  return (
    <div className="mt-10 max-w-md mx-auto p-8 bg-white/5 rounded-3xl border border-white/10 shadow-inner backdrop-blur-md">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full">
        <label className="label">
          <span className="label-text font-semibold opacity-70 iosevka-charon-regular">
            Enter Your Trader Code
          </span>
        </label>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <input 
              type="password" 
              placeholder="Code: XXXXXX" 
              {...register("traderCode", { 
                required: "Code is required",
                minLength: { value: 4, message: "Min 4 characters" }
              })}
              className={`input input-bordered w-full bg-white/10 border-white/20 focus:border-primary transition-all text-center tracking-[0.3em] font-mono iosevka-charon-bold ${errors.traderCode ? 'border-error' : ''}`}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary px-8 shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
          >
            Login
          </button>
        </div>

        {errors.traderCode && (
          <label className="label">
            <span className="label-text-alt text-error font-medium">{errors.traderCode.message}</span>
          </label>
        )}

        <p className="mt-6 text-[10px] uppercase tracking-widest opacity-40 iosevka-charon-light-italic text-center">
          Secure Access • Rs Community Center
        </p>
      </form>
    </div>
  );
};

export default Login;