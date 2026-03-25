import React from 'react';
import img from '../../assets/loginBg.jpg'
import Login from '../Login/Login';
const Introduction = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl font-sans">
      {/* Background Image with Blur Wrapper */}
      <div className="absolute inset-0 z-0">
        <img 
          src={img}
          alt="Shifat's Prediction Background"
          className="w-full h-full object-cover scale-110  opacity-40 dark:opacity-20" // Adjust opacity and blur level
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>
      </div>

      {/* Decorative Blur Circles (Keep these for extra depth) */}
      <div className="absolute top-[-10%] left-[-10%] z-5 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] z-5 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

      {/* Main Glass Card */}
      <div className="relative z-10 max-w-4xl w-full mx-4 p-8 md:p-16 bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 shadow-2xl rounded-[2rem] text-center">
        
        <div className="mb-6">
          <div className="badge badge-primary badge-outline py-3 px-4 font-semibold tracking-widest uppercase text-xs mb-4 iosevka-charon-medium">
            Official Prediction Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4 leading-tight">
            Welcome to <br /> RS COMMUNITY CENTER
          </h1>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto font-medium">
            Predict the market with <span className="text-primary font-bold">Rs Community Center</span>. 
            Standard analysis and high-accuracy insights.
          </p>
        </div>
           <Login></Login>
      </div>
    </div>
  );
};

export default Introduction;