import React,
 { memo } from 'react';

const Market = memo(() => {
  return (
    <div className="w-full h-[calc(100vh-80px)] bg-black relative overflow-hidden">
      {/* Background Loader */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
         <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
      
      <iframe 
        src="https://dkwin9.com/#/register?invitationCode=23478531386" 
        className="w-full h-full border-none shadow-2xl"
        title="Market Access"
        loading="lazy" 
        /* Strict Sandbox: 'allow-top-navigation' thaka jabe na.
           Eita bad dile DKWin script tomar React app-ke refresh korate parbe na.
        */
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
});

export default Market;