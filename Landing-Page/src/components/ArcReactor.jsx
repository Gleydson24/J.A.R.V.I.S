import React, { useState } from 'react';

export default function ArcReactor({ colorHex = '#00f0ff' }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shockwave, setShockwave] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: (-y / rect.height) * 30, y: (x / rect.width) * 30 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const triggerShockwave = () => {
    setShockwave(true);
    setTimeout(() => setShockwave(false), 800);
  };

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer select-none group"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={triggerShockwave}
    >
      {shockwave && (
        <div 
          className="absolute w-full h-full rounded-full border-4 animate-ping opacity-75 pointer-events-none"
          style={{ borderColor: colorHex }}
        />
      )}

      <div
        className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96 transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0 rounded-full border opacity-30 animate-spin"
          style={{ borderColor: colorHex, animationDuration: '20s' }}
        />

        <div
          className="absolute inset-4 rounded-full border-2 border-dashed opacity-50 animate-spin"
          style={{ borderColor: colorHex, animationDirection: 'reverse', animationDuration: '12s' }}
        />

        <div 
          className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 flex flex-col items-center justify-center bg-[#050b15]/90 backdrop-blur-md z-10 transition-all duration-300"
          style={{ 
            borderColor: colorHex, 
            boxShadow: `0 0 60px ${colorHex}` 
          }}
        >
          <div 
            className="w-20 h-20 rounded-full border-2 flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ 
              borderColor: colorHex, 
              boxShadow: `0 0 25px ${colorHex}`,
              backgroundColor: `${colorHex}15`
            }}
          >
            <span className="font-bold text-3xl font-mono" style={{ color: colorHex }}>J</span>
          </div>
          <span className="font-mono text-xs font-bold tracking-widest mt-4" style={{ color: colorHex }}>
            J.A.R.V.I.S
          </span>
          <span className="text-[9px] font-mono mt-0.5 animate-pulse" style={{ color: colorHex }}>
            {shockwave ? 'OVERDRIVE ATIVO' : 'CLIQUE PARA REAGIR'}
          </span>
        </div>
      </div>
    </div>
  );
}