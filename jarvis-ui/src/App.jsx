import React, { useState, useEffect } from 'react';
import {
  Home, Mic, LayoutGrid, CheckSquare, Info, RefreshCw, Settings, Wifi, Sun,
  Send, Menu, X, Code, MessageSquare, Tv, Music, Globe, FileText, Volume2,
  Key, Mail, User, LogOut, CheckCircle2, ShieldCheck, Sparkles, HelpCircle, Loader2
} from 'lucide-react';

import { 
  ComandosView, 
  AplicativosView, 
  TarefasView, 
  InformacoesView, 
  RotinaView, 
  ConfiguracoesView 
} from './components/MainViews';

export default function App() {
  // ESTADOS DE AUTENTICAÇÃO
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // FORMULÁRIOS DE AUTH
  const [loginKey, setLoginKey] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [user, setUser] = useState(null);
  const [generatedKey, setGeneratedKey] = useState('');

  // ESTADOS DO SISTEMA
  const [activeTab, setActiveTab] = useState('Inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza relógio
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  // CADASTRO REAL CONECTADO AO BACKEND
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao realizar cadastro.');
      }

      setGeneratedKey(data.key);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // LOGIN REAL CONECTADO AO BACKEND
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginKey) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: loginKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Chave de acesso inválida.');
      }

      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setLoginKey('');
    setGeneratedKey('');
  };

  const navItems = [
    { id: 'Inicio', label: 'Início', icon: Home },
    { id: 'Comandos', label: 'Comandos', icon: Mic },
    { id: 'Aplicativos', label: 'Aplicativos', icon: LayoutGrid },
    { id: 'Tarefas', label: 'Tarefas', icon: CheckSquare },
    { id: 'Informacoes', label: 'Informações', icon: Info },
    { id: 'Rotina', label: 'Rotina', icon: RefreshCw },
    { id: 'Configuracoes', label: 'Configurações', icon: Settings },
  ];

  const quickApps = [
    { name: 'VS Code', icon: Code, color: 'text-blue-400 bg-blue-500/10' },
    { name: 'Discord', icon: MessageSquare, color: 'text-indigo-400 bg-indigo-500/10' },
    { name: 'YouTube', icon: Tv, color: 'text-red-400 bg-red-500/10' },
    { name: 'Spotify', icon: Music, color: 'text-emerald-400 bg-emerald-500/10' },
    { name: 'WhatsApp', icon: MessageSquare, color: 'text-green-400 bg-green-500/10' },
    { name: 'Navegador', icon: Globe, color: 'text-yellow-400 bg-yellow-500/10' },
    { name: 'Notion', icon: FileText, color: 'text-slate-300 bg-slate-500/10' },
    { name: 'Telegram', icon: Send, color: 'text-sky-400 bg-sky-500/10' },
  ];

  /* --------------------------------------------------------------------- */
  /* TELA DE AUTENTICAÇÃO E TUTORIAL                                       */
  /* --------------------------------------------------------------------- */
  if (!isAuthenticated) {
    return (
      <div className="bg-[#050811] text-slate-100 min-h-screen p-4 flex flex-col justify-center items-center font-sans relative overflow-hidden">
        
        {/* Glow de Fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 z-10">
          
          {/* PAINEL ESQUERDO: LOGIN / CADASTRO */}
          <div className="md:col-span-6 bg-[#09101f]/90 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_40px_rgba(0,240,255,0.1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full border border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#00f0ff]">
                  <span className="font-bold text-cyan-400 text-sm">J</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg text-white tracking-widest">J . A . R . V . I . S</h1>
                  <p className="text-[10px] text-cyan-400/80 font-mono">SISTEMA DE AUTENTICAÇÃO</p>
                </div>
              </div>

              {/* MUDANÇA DE ABA (LOGIN / CADASTRO) */}
              <div className="flex rounded-xl bg-[#050b15] p-1 border border-cyan-500/20 mb-6">
                <button
                  onClick={() => { setAuthMode('login'); setGeneratedKey(''); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    authMode === 'login' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Entrar com Chave
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    authMode === 'register' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Criar Conta
                </button>
              </div>

              {/* FORMULÁRIO DE LOGIN */}
              {authMode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-1.5">CHAVE ÚNICA DE ACESSO</label>
                    <div className="flex items-center gap-2 bg-[#050b15] border border-cyan-500/30 rounded-xl px-3 py-2.5 focus-within:border-cyan-400 transition-all">
                      <Key className="w-4 h-4 text-cyan-400" />
                      <input
                        type="text"
                        placeholder="Ex: JVS-8F2A-999"
                        value={loginKey}
                        onChange={(e) => setLoginKey(e.target.value.toUpperCase())}
                        className="bg-transparent text-xs text-white outline-none w-full font-mono placeholder:text-slate-600"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Sua chave permite sincronizar seu Jarvis em qualquer computador.</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    ACESSAR SISTEMA
                  </button>
                </form>
              )}

              {/* FORMULÁRIO DE CADASTRO */}
              {authMode === 'register' && (
                <div>
                  {!generatedKey ? (
                    <form onSubmit={handleRegister} className="space-y-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-300 block mb-1">NOME DO OPERADOR</label>
                        <div className="flex items-center gap-2 bg-[#050b15] border border-cyan-500/30 rounded-xl px-3 py-2">
                          <User className="w-4 h-4 text-cyan-400" />
                          <input
                            type="text"
                            placeholder="Seu nome"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            className="bg-transparent text-xs text-white outline-none w-full placeholder:text-slate-600"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-300 block mb-1">E-MAIL</label>
                        <div className="flex items-center gap-2 bg-[#050b15] border border-cyan-500/30 rounded-xl px-3 py-2">
                          <Mail className="w-4 h-4 text-cyan-400" />
                          <input
                            type="email"
                            placeholder="seuemail@exemplo.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="bg-transparent text-xs text-white outline-none w-full placeholder:text-slate-600"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        GERAR CHAVE E ENVIAR POR E-MAIL
                      </button>
                    </form>
                  ) : (
                    /* SUCESSO DE CADASTRO COM A CHAVE */
                    <div className="bg-[#050b15] border border-emerald-500/40 rounded-xl p-4 text-center space-y-3">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <div>
                        <h3 className="text-xs font-bold text-emerald-300">Chave Gerada e Enviada!</h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">Sua chave foi enviada para <strong className="text-white">{regEmail}</strong>.</p>
                      </div>

                      <div className="bg-[#09101f] border border-cyan-500/30 p-2.5 rounded-lg font-mono text-cyan-300 text-sm font-bold tracking-widest select-all">
                        {generatedKey}
                      </div>

                      <button
                        onClick={() => {
                          setLoginKey(generatedKey);
                          setAuthMode('login');
                        }}
                        className="w-full py-2 bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs rounded-lg transition-all"
                      >
                        USAR ESTA CHAVE PARA LOGAR
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/10 text-center">
              <button 
                onClick={() => setShowTutorial(!showTutorial)}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline flex items-center justify-center gap-1.5 mx-auto font-mono"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showTutorial ? 'Ocultar Guia Rápido' : 'Como Funciona o J.A.R.V.I.S?'}
              </button>
            </div>
          </div>

          {/* PAINEL DIREITO: TUTORIAL DE USO DO JARVIS */}
          <div className="md:col-span-6 bg-[#09101f]/80 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-cyan-500/20 mb-4">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Guia & Manual de Operação
                </h2>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex gap-3 items-start bg-[#050b15]/60 p-3 rounded-xl border border-cyan-500/10">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold font-mono text-xs">01</div>
                  <div>
                    <h4 className="font-bold text-cyan-300 mb-0.5">Ativação Por Comando de Voz</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      O assistente permanece em escuta contínua. Basta pronunciar nitidamente a palavra-chave <strong className="text-white">"JARVIS"</strong> para ativá-lo.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-[#050b15]/60 p-3 rounded-xl border border-cyan-500/10">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold font-mono text-xs">02</div>
                  <div>
                    <h4 className="font-bold text-cyan-300 mb-0.5">Ciclo do Microfone</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Quando o Jarvis está respondendo, o microfone é desativado momentaneamente para evitar interferências. Para dar outro comando, diga <strong className="text-white">"JARVIS"</strong> novamente.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start bg-[#050b15]/60 p-3 rounded-xl border border-cyan-500/10">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold font-mono text-xs">03</div>
                  <div>
                    <h4 className="font-bold text-cyan-300 mb-0.5">Chave de Acesso Portátil</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Sua chave guarda suas configurações, aplicativos e rotinas. Use-a em qualquer computador para inicializar seu Jarvis pessoal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-xl text-[10px] text-cyan-300/80 font-mono text-center">
              "Sempre pronto para otimizar suas tarefas diárias."
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------------- */
  /* DASHBOARD PRINCIPAL (TELA LOGADA DO APP)                              */
  /* --------------------------------------------------------------------- */
  return (
    <div className="bg-[#050811] text-slate-100 min-h-screen p-3 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      
      {/* DRAWER MENU */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex animate-fadeIn"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="w-64 bg-[#09101f] border-r border-cyan-500/30 h-full p-4 flex flex-col justify-between shadow-[5px_0_25px_rgba(0,240,255,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                  <div className="w-7 h-7 rounded-full border border-cyan-400 flex items-center justify-center">
                    <span className="text-xs font-bold text-cyan-400">J</span>
                  </div>
                  <span className="font-bold text-sm text-white tracking-wider">J.A.R.V.I.S</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3">
              <div className="bg-[#050b15] border border-cyan-500/20 p-2.5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400">Operador Logado</p>
                  <p className="text-xs font-bold text-cyan-300">{user?.name || 'Operador'}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  title="Sair da Conta"
                  className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] text-slate-500 text-center border-t border-cyan-500/10 pt-2 font-mono">
                J.A.R.V.I.S OS v1.0
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER SUPERIOR */}
      <header className="bg-[#09101f]/90 border border-cyan-500/20 rounded-2xl px-5 py-3 flex items-center justify-between backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer mr-1"
            title="Abrir Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('Inicio')}>
            <div className="relative w-8 h-8 rounded-full border border-cyan-400 flex items-center justify-center shadow-[0_0_10px_#00f0ff]">
              <div className="w-4 h-4 rounded-full border border-cyan-300 animate-ping absolute opacity-50" />
              <span className="text-[10px] font-bold text-cyan-400">J</span>
            </div>
            <div>
              <h1 className="font-bold tracking-widest text-lg text-white">J . A . R . V . I . S</h1>
            </div>
          </div>

          <span className="text-xs text-slate-400 border-l border-slate-700 pl-3 ml-1 hidden sm:inline">
            Bem-vindo(a), <strong className="text-cyan-300">{user?.name}</strong>.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="hidden md:inline">Perfil Conectado</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <Wifi className="w-4 h-4" />
            <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />
            <LogOut className="w-4 h-4 hover:text-red-400 cursor-pointer" onClick={handleLogout} title="Sair" />
          </div>
          <div className="text-right border-l border-slate-800 pl-4">
            <div className="font-bold text-sm text-white font-mono tracking-wider">{formattedTime}</div>
            <div className="text-[10px] text-slate-400 font-mono">{formattedDate}</div>
          </div>
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO DINÂMICA */}
      {activeTab === 'Inicio' && (
        <div className="grid grid-cols-12 gap-3 my-3 flex-1 items-stretch">
          
          {/* ÁREA CENTRAL INTEGRADA: REATOR + ESCUTA POR HOTWORD */}
          <div className="col-span-12 lg:col-span-8 bg-[#09101f]/80 border border-cyan-500/20 rounded-2xl p-6 flex flex-col items-center justify-between backdrop-blur-md relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.05)]">
            
            {/* TOPO DO PAINEL CENTRAL */}
            <div className="w-full flex items-center justify-between border-b border-cyan-500/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase font-mono">
                  Escuta Contínua
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Ativação: <strong className="text-cyan-400">"Jarvis"</strong>
              </div>
            </div>

            {/* CÍRCULO DO JARVIS */}
            <div className="flex flex-col items-center justify-center my-auto py-4">
              <div className="relative flex items-center justify-center">
                <div className="w-56 h-56 rounded-full border border-cyan-500/20 animate-spin absolute" style={{ animationDuration: '20s' }} />
                <div className="w-48 h-48 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin absolute" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
                <div className="w-36 h-36 rounded-full bg-cyan-500/10 animate-ping absolute opacity-30" />

                <div className="w-36 h-36 rounded-full border-4 border-cyan-400 shadow-[0_0_40px_#00f0ff] flex flex-col items-center justify-center bg-[#050b15] z-10">
                  <span className="font-bold tracking-[0.25em] text-cyan-300 text-sm">J.A.R.V.I.S</span>
                  <span className="text-[9px] text-cyan-400/70 font-mono mt-1">SEMPRE ATIVO</span>
                </div>
              </div>

              {/* ONDAS SONORAS */}
              <div className="flex items-center gap-1.5 h-8 mt-6">
                {[30, 60, 20, 85, 40, 100, 70, 90, 30, 80, 50, 95, 40, 70, 20, 60].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-1 rounded-full bg-cyan-400 animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }} 
                  />
                ))}
              </div>
            </div>

            {/* INTERAÇÃO DE TEXTO */}
            <div className="w-full space-y-2">
              <div className="bg-[#050b15]/90 border border-cyan-500/20 rounded-xl p-3 space-y-2">
                <div className="flex items-start justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mic className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px]">
                      <strong className="text-cyan-400 font-mono">{user?.name || 'Você'}:</strong> "Jarvis, abra o YouTube e toque uma música."
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">{formattedTime.slice(0, 5)}</span>
                </div>

                <div className="flex items-start justify-between text-xs pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-200">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px]">
                      <strong className="text-emerald-400 font-mono">JARVIS:</strong> "Com certeza, senhor. Executando o comando agora."
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono">{formattedTime.slice(0, 5)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#080e1a] border border-cyan-500/20 rounded-xl px-3 py-2">
                <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />
                <input
                  type="text"
                  placeholder="Diga 'Jarvis' ou digite um comando..."
                  className="bg-transparent text-xs text-white outline-none flex-1 placeholder:text-slate-500"
                />
                <Send className="w-3.5 h-3.5 text-cyan-400 cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>

          </div>

          {/* COLUNA DIREITA: FRASES, CLIMA E APPS */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            
            {/* CARD DE FRASES */}
            <div className="rounded-2xl border border-cyan-500/20 bg-[#070d18] p-4 text-center relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              <p className="text-xs italic text-slate-300 relative z-10 leading-relaxed">
                "Não é a vida que te define, mas as escolhas que você faz todos os dias."
              </p>
              <p className="text-[10px] text-cyan-400 font-bold mt-2 relative z-10 tracking-widest">— J.A.R.V.I.S</p>
            </div>

            {/* CLIMA */}
            <div className="bg-[#09101f]/80 border border-cyan-500/15 rounded-2xl p-4 backdrop-blur-md">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xs font-bold text-white">Clima Local</h3>
                <span className="text-[10px] text-slate-400">São José - RN</span>
              </div>
              
              <div className="flex items-center justify-between my-2">
                <div className="flex items-center gap-2.5">
                  <Sun className="w-8 h-8 text-yellow-400 animate-spin-slow" />
                  <div>
                    <div className="text-xl font-bold text-white font-mono">27°C</div>
                    <div className="text-[10px] text-slate-300">Céu limpo</div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 text-right space-y-0.5 font-mono">
                  <div>Umidade: 62%</div>
                  <div>Vento: 14 km/h</div>
                  <div>Máx: 32° | Min: 21°</div>
                </div>
              </div>
            </div>

            {/* APLICATIVOS RÁPIDOS */}
            <div className="bg-[#09101f]/80 border border-cyan-500/15 rounded-2xl p-4 backdrop-blur-md flex-1">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-white">Aplicativos Rápidos</h3>
                <span className="text-[10px] text-slate-400">Atalhos</span>
              </div>
              
              <div className="grid grid-cols-4 gap-3 text-center">
                {quickApps.map((app, i) => {
                  const Icon = app.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                      <div className={`w-10 h-10 rounded-xl ${app.color} border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-400/50 transition-all shadow-sm`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] text-slate-400 group-hover:text-white transition-colors">{app.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DEMAIS ABAS DO SISTEMA */}
      {activeTab !== 'Inicio' && (
        <div className="my-3 flex-1 flex flex-col">
          {activeTab === 'Comandos' && <ComandosView />}
          {activeTab === 'Aplicativos' && <AplicativosView />}
          {activeTab === 'Tarefas' && <TarefasView />}
          {activeTab === 'Informacoes' && <InformacoesView />}
          {activeTab === 'Rotina' && <RotinaView />}
          {activeTab === 'Configuracoes' && <ConfiguracoesView />}
        </div>
      )}

      {/* FOOTER */}
      <header className="bg-[#09101f]/90 border border-cyan-500/20 rounded-2xl px-5 py-2.5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border border-cyan-400 flex items-center justify-center text-[9px] font-bold text-cyan-300">
            J
          </div>
          <div className="flex items-center gap-1 h-3">
            {[30, 80, 40, 90, 50, 70, 30].map((h, i) => (
              <div key={i} className="w-0.5 bg-cyan-400 rounded-full" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs font-bold tracking-[0.4em] text-cyan-300">J . A . R . V . I . S</div>
          <div className="text-[8px] text-slate-400 tracking-widest mt-0.5">
            SISTEMA OPERACIONAL PORTÁTIL
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <p className="text-[10px] italic text-slate-300">"Sempre pronto para o próximo comando."</p>
        </div>
      </header>

    </div>
  );
}