import React, { useState, useEffect } from 'react';

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('pt-BR');
  const dateString = time.toLocaleDateString('pt-BR', { 
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' 
  });

  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
      <span className="text-xs font-bold text-jarvis-cyan tracking-wider uppercase">HORÁRIO / DATA</span>
      <div className="my-3">
        <div className="text-3xl font-extrabold text-white tracking-wider font-mono">
          {timeString}
        </div>
        <div className="text-xs text-gray-400 capitalize mt-1">
          {dateString}
        </div>
      </div>
      <div className="w-full bg-jarvis-cyan/20 h-1 rounded-full overflow-hidden">
        <div className="bg-jarvis-cyan h-full w-2/3 animate-pulse"></div>
      </div>
    </div>
  );
}