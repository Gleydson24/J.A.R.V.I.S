import React from 'react';
import { 
  Mic, Search, Plus, CheckSquare, Info, Clock, Settings, Terminal, 
  Folder, Lock, RotateCcw, Cpu, HardDrive, Wifi, Globe, MessageSquare, 
  Mail, Tv, Play, BookOpen, Dumbbell, Heart, Moon, Sun, Sliders, Volume2, 
  Eye, Shield, Monitor, MoreVertical, Compass, Music, MessageCircle, ExternalLink
} from 'lucide-react';

// Card container padronizado estilo HUD
const HudCard = ({ title, subtitle, icon: Icon, children, className = "" }) => (
  <div className={`bg-[#0b1326]/80 border border-cyan-500/20 rounded-xl p-5 backdrop-blur-md relative overflow-hidden ${className}`}>
    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
    {title && (
      <div className="flex items-center justify-between mb-4 border-b border-cyan-500/10 pb-3">
        <div className="flex items-center gap-2.5">
          {Icon && <Icon className="w-5 h-5 text-cyan-400" />}
          <div>
            <h3 className="text-cyan-300 font-semibold text-sm tracking-wide uppercase">{title}</h3>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
      </div>
    )}
    {children}
  </div>
);

// --- 1. TELA DE COMANDOS ---
export const ComandosView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <HudCard title="Comandos" subtitle="Controle o J.A.R.V.I.S com sua voz." icon={Mic}>
      <div className="flex flex-col items-center justify-center py-6 border-b border-cyan-500/10">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 mb-4 animate-pulse">
          <Mic className="w-10 h-10" />
        </div>
        <p className="text-xs text-cyan-400/80 font-mono">Aguardando comando...</p>
      </div>

      <div className="mt-4">
        <h4 className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">Comandos de voz sugeridos</h4>
        <div className="space-y-2">
          {['"Abra o YouTube"', '"Pesquise sobre filosofia"', '"Defina um lembrete"', '"Mostre o clima de hoje"', '"Inicie o modo foco"'].map((cmd, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2.5 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-slate-300 hover:border-cyan-500/40 transition-colors">
              <Mic className="w-4 h-4 text-cyan-400" />
              <span>{cmd}</span>
            </div>
          ))}
        </div>
      </div>
    </HudCard>

    <HudCard title="Histórico Recente" subtitle="Reconhecimento de voz e execuções" icon={Clock}>
      <div className="space-y-3">
        {[
          { text: "Abrir o YouTube", time: "17:32" },
          { text: "Pesquisar sobre filosofia", time: "16:58" },
          { text: "Definir lembrete", time: "16:41" },
          { text: "Abrir o VS Code", time: "15:20" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/40 border border-cyan-500/10 rounded-lg text-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-slate-200">{item.text}</span>
            </div>
            <span className="text-xs font-mono text-slate-500">{item.time}</span>
          </div>
        ))}
      </div>
    </HudCard>
  </div>
);

// --- 2. TELA DE APLICATIVOS ---
export const AplicativosView = () => {
  const apps = [
    { name: "VS Code", cat: "Editor de código", icon: Terminal, color: "text-blue-400" },
    { name: "Discord", cat: "Comunicação", icon: MessageSquare, color: "text-indigo-400" },
    { name: "YouTube", cat: "Vídeos e músicas", icon: Tv, color: "text-red-400" },
    { name: "Spotify", cat: "Música e podcasts", icon: Music, color: "text-emerald-400" },
    { name: "WhatsApp", cat: "Mensagens", icon: MessageCircle, color: "text-green-400" },
    { name: "Navegador", cat: "Internet", icon: Globe, color: "text-amber-400" },
    { name: "Notion", cat: "Produtividade", icon: BookOpen, color: "text-slate-200" },
    { name: "Telegram", cat: "Mensagens", icon: MessageSquare, color: "text-sky-400" },
    { name: "Netflix", cat: "Séries e filmes", icon: Tv, color: "text-red-500" },
    { name: "Steam", cat: "Jogos", icon: Compass, color: "text-blue-300" },
    { name: "Gmail", cat: "E-mail", icon: Mail, color: "text-red-400" },
    { name: "Explorador", cat: "Arquivos", icon: Folder, color: "text-yellow-400" },
  ];

  return (
    <HudCard title="Aplicativos" subtitle="Seus aplicativos, um comando de distância." icon={Compass}>
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Buscar aplicativos..." 
          readOnly
          className="w-full bg-slate-900/80 border border-cyan-500/20 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {apps.map((app, idx) => {
          const IconComp = app.icon;
          return (
            <div key={idx} className="flex flex-col items-center justify-center p-4 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group cursor-pointer">
              <div className={`p-3 rounded-lg bg-slate-800/80 mb-2.5 group-hover:scale-110 transition-transform ${app.color}`}>
                <IconComp className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-slate-200">{app.name}</span>
              <span className="text-[11px] text-slate-500 mt-0.5">{app.cat}</span>
            </div>
          );
        })}
      </div>
    </HudCard>
  );
};

// --- 3. TELA DE TAREFAS ---
export const TarefasView = () => (
  <HudCard title="Tarefas" subtitle="Organize seu dia." icon={CheckSquare}>
    <div className="flex gap-2 mb-6">
      <input 
        type="text" 
        placeholder="+ Nova tarefa..." 
        readOnly
        className="flex-1 bg-slate-900/80 border border-cyan-500/20 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
      />
    </div>

    <div className="space-y-2.5">
      {[
        { text: "Estudar Python (IFR)", tag: "Hoje • 19:00" },
        { text: "Ler Confissões de Santo Agostinho", tag: "Hoje • 21:00" },
        { text: "Treino de atletismo + calistenia", tag: "Amanhã • 16:30" },
        { text: "Revisar projeto JARVIS", tag: "Amanhã • 20:00" },
        { text: "Oração (Rosário)", tag: "Todos os dias • 19:30" },
      ].map((item, idx) => (
        <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-900/50 border border-cyan-500/10 rounded-lg group hover:border-cyan-500/30">
          <div className="flex items-center gap-3">
            <input type="checkbox" readOnly className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0" />
            <div>
              <p className="text-sm text-slate-200 font-medium">{item.text}</p>
              <p className="text-xs text-cyan-400/80 mt-0.5">{item.tag}</p>
            </div>
          </div>
          <button className="text-slate-500 hover:text-slate-300"><MoreVertical className="w-4 h-4" /></button>
        </div>
      ))}
    </div>
  </HudCard>
);

// --- 4. TELA DE INFORMAÇÕES ---
export const InformacoesView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <HudCard title="Sistema" subtitle="Tudo o que você precisa saber." icon={Info} className="lg:col-span-2">
      <div className="flex border-b border-slate-800 mb-5 gap-6 text-sm">
        <button className="pb-2 border-b-2 border-cyan-400 text-cyan-400 font-medium">Sistema</button>
        <button className="pb-2 text-slate-500 hover:text-slate-300">Rede</button>
        <button className="pb-2 text-slate-500 hover:text-slate-300">Disco</button>
        <button className="pb-2 text-slate-500 hover:text-slate-300">Processos</button>
      </div>

      <div className="space-y-4 text-sm">
        {[
          { label: "Sistema Operacional", val: "Windows 11" },
          { label: "Uptime", val: "2 dias, 14 horas" },
          { label: "Processador", val: "Intel Core i5" },
          { label: "Memória RAM", val: "8 GB" },
          { label: "Placa de Vídeo", val: "NVIDIA GeForce GTX 1650" },
        ].map((row, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-800/60">
            <span className="text-slate-400">{row.label}</span>
            <span className="text-cyan-300 font-mono font-medium">{row.val}</span>
          </div>
        ))}
      </div>
    </HudCard>

    <HudCard title="Atalhos Úteis" icon={Terminal}>
      <div className="space-y-3 text-sm">
        {[
          { action: "Abrir o terminal", key: "Ctrl + `" },
          { action: "Gerenciador de arquivos", key: "Win + E" },
          { action: "Configurações", key: "Win + I" },
          { action: "Travar o PC", key: "Win + L" },
          { action: "Reiniciar", key: "Alt + F4" },
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
            <span className="text-slate-300 text-xs">{item.action}</span>
            <kbd className="px-2 py-1 bg-slate-800 text-cyan-400 rounded text-xs font-mono border border-slate-700">{item.key}</kbd>
          </div>
        ))}
      </div>
    </HudCard>
  </div>
);

// --- 5. TELA DE ROTINA ---
export const RotinaView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <HudCard title="Rotina" subtitle="Sua rotina, mais produtiva." icon={Clock} className="lg:col-span-2">
      <div className="space-y-3">
        {[
          { time: "05:30", label: "Acordar", icon: Sun },
          { time: "06:00", label: "Oração", icon: Heart },
          { time: "06:30", label: "Estudo", icon: BookOpen },
          { time: "17:00", label: "Academia", icon: Dumbbell },
          { time: "20:00", label: "Lazer", icon: Tv },
          { time: "21:30", label: "Leitura", icon: BookOpen },
          { time: "23:00", label: "Dormir", icon: Moon },
        ].map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 border border-cyan-500/10 rounded-lg">
              <div className="flex items-center gap-3">
                <StepIcon className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-200 font-medium">{step.label}</span>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">{step.time}</span>
            </div>
          );
        })}
      </div>
    </HudCard>

    <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
      <div className="relative z-20">
        <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">Inspiração</span>
        <blockquote className="mt-4 text-base italic text-slate-200 leading-relaxed">
          "Disciplina é o que te leva onde a motivação não leva."
        </blockquote>
        <p className="mt-2 text-xs text-cyan-400 font-mono">— J.A.R.V.I.S</p>
      </div>
    </div>
  </div>
);

// --- 6. TELA DE CONFIGURAÇÕES ---
export const ConfiguracoesView = () => (
  <HudCard title="Configurações" subtitle="Personalize sua experiência." icon={Settings}>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="space-y-1 border-r border-slate-800 pr-4">
        {[
          { label: "Geral", icon: Sliders, active: true },
          { label: "Voz", icon: Mic },
          { label: "Aparência", icon: Monitor },
          { label: "Notificações", icon: Info },
          { label: "Privacidade", icon: Shield },
          { label: "Sobre", icon: Info },
        ].map((item, idx) => {
          const ItemIcon = item.icon;
          return (
            <button 
              key={idx} 
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                item.active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ItemIcon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="md:col-span-3 space-y-5">
        <h4 className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-4">Geral</h4>

        {[
          { title: "Iniciar com o Windows", checked: true },
          { title: "Modo escuro", checked: true },
          { title: "Som de notificações", checked: true },
          { title: "Animações da interface", checked: true },
        ].map((opt, idx) => (
          <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-800/80">
            <span className="text-sm text-slate-300">{opt.title}</span>
            <input type="checkbox" checked={opt.checked} readOnly className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700" />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Idioma</label>
            <select className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
              <option>Português (Brasil)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Tema</label>
            <select className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
              <option>Neon Azul</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="px-5 py-2.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-semibold hover:bg-cyan-500/30 transition-colors">
            Salvar alterações
          </button>
        </div>
      </div>
    </div>
  </HudCard>
);