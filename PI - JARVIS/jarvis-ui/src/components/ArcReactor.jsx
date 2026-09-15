export default function ArcReactor({ statusText = "JARVIS SYSTEM ACTIVE" }) {
  return (
    <div className="relative flex items-center justify-center w-80 h-80 my-4">
      {/* Anel Externo Giratório */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-jarvis-cyan/40 animate-spin-slow"></div>

      {/* Anel Intermediário Inverso */}
      <div className="absolute inset-4 rounded-full border border-jarvis-cyan/60 border-t-transparent border-b-transparent animate-spin-reverse"></div>

      {/* Anel Brilhante Interno */}
      <div className="absolute inset-10 rounded-full border-4 border-jarvis-cyan/30 shadow-neon-cyan animate-pulse-glow"></div>

      {/* Núcleo Central */}
      <div className="relative z-10 flex flex-col items-center justify-center w-48 h-48 rounded-full bg-jarvis-cyan/10 backdrop-blur-md border border-jarvis-cyan shadow-neon-glow">
        <div className="w-16 h-16 rounded-full bg-jarvis-cyan/20 border-2 border-jarvis-cyan flex items-center justify-center animate-pulse">
          <div className="w-6 h-6 rounded-full bg-jarvis-cyan shadow-neon-glow"></div>
        </div>
        <span className="mt-3 text-xs tracking-widest font-bold text-jarvis-cyan uppercase">
          {statusText}
        </span>
      </div>
    </div>
  );
}