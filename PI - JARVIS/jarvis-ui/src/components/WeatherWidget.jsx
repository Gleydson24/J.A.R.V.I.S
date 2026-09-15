import React from 'react';
import { Sun } from 'lucide-react';

export default function WeatherWidget() {
  return (
    <div className="glass-panel p-5 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-jarvis-cyan tracking-wider uppercase">CLIMA LOCAL</span>
        <span className="text-xs text-gray-400">Caicó, RN</span>
      </div>
      <div className="flex items-center justify-between my-2">
        <div>
          <div className="text-3xl font-bold text-white">31°C</div>
          <div className="text-xs text-gray-300">Ensolarado</div>
        </div>
        <Sun className="w-10 h-10 text-yellow-400 animate-spin-slow" />
      </div>
      <div className="text-[10px] text-gray-400 flex justify-between mt-3 pt-2 border-t border-jarvis-border">
        <span>Umidade: 55%</span>
        <span>Vento: 18 km/h</span>
      </div>
    </div>
  );
}