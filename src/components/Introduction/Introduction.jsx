import React from 'react';
import img from '../../assets/loginBg.jpg';
import Login from '../Login/Login';
import introimg from '../../../public/icon.jpeg';

const Introduction = () => {
  return (
    <div className="relative min-h-screen md:min-h-[80vh] flex items-center justify-center overflow-hidden rounded-xl md:rounded-3xl font-sans py-10 md:py-0">
      
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0">
        <img 
          src={img}
          alt="Background"
          className="w-full h-full object-cover scale-110 opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      {/* Decorative Blur Circles - Mobile e choto kora hoyeche */}
      <div className="absolute top-[-5%] left-[-5%] z-5 w-40 h-40 md:w-72 md:h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-5%] right-[-5%] z-5 w-56 h-56 md:w-96 md:h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      {/* Main Glass Card */}
      <div className="relative z-10 max-w-4xl w-[92%] md:w-full mx-auto p-5 md:p-16 bg-white/5 dark:bg-black/30 backdrop-blur-md border border-white/10 shadow-2xl rounded-3xl text-center">
        
        {/* Profile/Icon Image - Responsive Size */}
        <div className='flex justify-center'>
          <img 
            src={introimg} 
            alt="Icon" 
            className='rounded-full mb-4 w-38 h-38 md:w-40 md:h-40 object-cover border-2 border-primary/30 shadow-lg' 
          />
        </div>

        <div className="mb-4 md:mb-8">
          <div className="badge badge-primary badge-outline py-2 px-3 font-bold tracking-widest uppercase text-[9px] md:text-xs mb-3 iosevka-charon-medium">
            Official Prediction Portal
          </div>
          
          {/* Main Title - Mobile e text size komano hoyeche */}
          <h1 className="text-2xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-3 leading-tight uppercase tracking-tighter">
            Welcome to <br /> 
            <span className="text-3xl md:text-5xl">R(S) Community</span>
          </h1>
          
          {/* Subtext - Mobile e font size adjustment */}
          <p className="text-xs md:text-lg opacity-60 max-w-xl mx-auto font-medium leading-relaxed">
            Predict the market with <span className="text-primary font-bold">R(S) Community Center</span>. 
            Standard analysis and high-accuracy insights.
          </p>
        </div>

        {/* Login Component */}
        <div className="w-full max-w-sm mx-auto">
          <Login />
        </div>

      </div>
    </div>
  );
};

export default Introduction;