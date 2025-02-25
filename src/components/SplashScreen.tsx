import React, { useEffect, useState } from "react";

const SplashScreen: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 9000); // Starts fading at 9 seconds
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-[#1E3A8A] transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
        Expense Tracker
      </h1>
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default SplashScreen;
