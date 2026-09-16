import { Globe, Compass, Code, Terminal } from 'lucide-react';

export default function AutomationWidget() {
  const actions = [
    { label: 'Navegador Web', icon: Compass },
    { label: 'Pesquisar Web', icon: Globe },
    { label: 'VS Code', icon: Code },
    { label: 'Terminal', icon: Terminal },
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl col-span-full md:col-span-1">
      <span className="text-xs font-bold text-jarvis-cyan tracking-wider uppercase mb-3 block">
        AÇÕES DE AUTOMAÇÃO
      </span>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-jarvis-cyan/10 border border-jarvis-border hover:bg-jarvis-cyan/20 hover:border-jarvis-cyan transition duration-200 group"
            >
              <Icon className="w-6 h-6 text-jarvis-cyan mb-1 group-hover:scale-110 transition" />
              <span className="text-xs text-gray-200">{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}