import React, { useState, useEffect } from "react";

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="text-lg font-semibold text-gray-700">
      {time.toLocaleTimeString()} {/* Displays live time */}
    </div>
  );
};

export default LiveClock;
