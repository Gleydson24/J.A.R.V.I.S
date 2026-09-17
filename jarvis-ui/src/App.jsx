import React, { useState, useEffect, useRef } from 'react';
import {
  Home, Mic, LayoutGrid, CheckSquare, Info, RefreshCw, Settings, Wifi, Sun,
  Send, Menu, X, Code, MessageSquare, Tv, Music, Globe, FileText, Volume2,
  Key, Mail, User, LogOut, CheckCircle2, ShieldCheck, Sparkles, HelpCircle, Loader2, VolumeX
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginKey, setLoginKey] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [user, setUser] = useState(null);
  const [generatedKey, setGeneratedKey] = useState('');

  const [activeTab, setActiveTab] = useState('Inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // ESTADOS DE VOZ DO DIÁLOGO
  // 'PASSIVE' (aguardando falar "Jarvis") | 'WAITING_FOR_COMMAND' (ouviu "Jarvis" e espera o comando) | 'SPEAKING' (falando)
  const [systemState, setSystemState] = useState('PASSIVE'); 
  const [inputMessage, setInputMessage] = useState('');
  const [lastUserMessage, setLastUserMessage] = useState('Aguardando palavra-chave "Jarvis"...');
  const [lastJarvisResponse, setLastJarvisResponse] = useState('Sistemas prontos. Diga "Jarvis".');

  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const systemStateRef = useRef(systemState);
  const nextStateRef = useRef('PASSIVE');

  // Mantém a referência do estado sempre atualizada para evitar bugs de callback
  useEffect(() => {
    systemStateRef.current = systemState;
  }, [systemState]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  /* --------------------------------------------------------------------- */
  /* RECONHECIMENTO DE VOZ COM FLUXO EM DUAS ETAPAS                        */
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    if (!isAuthenticated) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'pt-BR';

      recognition.onresult = (event) => {
        if (isSpeakingRef.current) return;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const transcript = event.results[i][0].transcript.trim();
            const lowerText = transcript.toLowerCase();
            const currentState = systemStateRef.current;

            // ETAPA 1: Sistema em silêncio aguardando você dizer "JARVIS"
            if (currentState === 'PASSIVE') {
              if (lowerText.includes('jarvis')) {
                const commandAfterKeyword = lowerText.split('jarvis')[1]?.trim();

                // Se você falou apenas "Jarvis"
                if (!commandAfterKeyword || commandAfterKeyword.length < 2) {
                  setLastUserMessage('JARVIS');
                  setLastJarvisResponse('Olá senhor, como posso ajudar?');
                  speakText('Olá senhor, como posso ajudar?', 'WAITING_FOR_COMMAND');
                } else {
                  // Se você falou tudo de uma vez: "Jarvis, qual é a previsão do tempo?"
                  handleProcessCommand(commandAfterKeyword);
                }
              }
            } 
            // ETAPA 2: Jarvis já disse "Olá senhor..." e está esperando seu comando
            else if (currentState === 'WAITING_FOR_COMMAND') {
              handleProcessCommand(transcript);
            }
          }
        }
      };

      recognition.onerror = (e) => {
        console.warn('Status do microfone:', e.error);
      };

      recognition.onend = () => {
        if (!isSpeakingRef.current && isAuthenticated) {
          try {
            recognition.start();
          } catch (e) {}
        }
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch (e) {}
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [isAuthenticated]);

  // FUNÇÃO PARA O JARVIS FALAR
  const speakText = (text, targetNextState = 'PASSIVE') => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    isSpeakingRef.current = true;
    nextStateRef.current = targetNextState;
    setSystemState('SPEAKING');

    // Pausa microfone durante a fala
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e){}
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt'));
    if (ptVoice) utterance.voice = ptVoice;

    const handleEnd = () => {
      isSpeakingRef.current = false;
      const nextState = nextStateRef.current;
      setSystemState(nextState);

      // Religa microfone
      if (recognitionRef.current && isAuthenticated) {
        try { recognitionRef.current.start(); } catch(e){}
      }
    };

    utterance.onend = handleEnd;
    utterance.onerror = handleEnd;

    window.speechSynthesis.speak(utterance);
  };

  /* --------------------------------------------------------------------- */
  /* CONEXÃO COM O BACKEND E IA EM CASCATA                                  */
  /* --------------------------------------------------------------------- */
  const handleProcessCommand = async (commandText) => {
    if (!commandText) return;

    setLastUserMessage(commandText);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: commandText }),
      });

      const data = await response.json();
      const reply = data.reply || "Desculpe, senhor. Não consegui processar a resposta no momento.";

      setLastJarvisResponse(reply);
      // Após responder o comando, volta para o estado PASSIVE esperando um novo "Jarvis"
      speakText(reply, 'PASSIVE');

    } catch (err) {
      console.error("Erro na comunicação com a IA:", err);
      const errorMsg = "Falha ao conectar aos meus módulos de inteligência, senhor.";
      setLastJarvisResponse(errorMsg);
      speakText(errorMsg, 'PASSIVE');
    }
  };

  // AUTENTICAÇÃO
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
      if (!response.ok) throw new Error(data.error || 'Erro ao cadastrar.');
      setGeneratedKey(data.key);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      if (!response.ok) throw new Error(data.error || 'Chave inválida.');

      setUser(data.user);
      setIsAuthenticated(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsAuthenticated(false);
    setUser(null);
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
  /* TELA DE LOGIN / AUTENTICAÇÃO                                          */
  /* --------------------------------------------------------------------- */
  if (!isAuthenticated) {
    return (
      <div className="bg-[#050811] text-slate-100 min-h-screen p-4 flex flex-col justify-center items-center font-sans relative overflow-hidden">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 z-10">
          <div className="md:col-span-6 bg-[#09101f]/90 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_40px_rgba(0,240,255,0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full border border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#00f0ff]">
                <span className="font-bold text-cyan-400 text-sm">J</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-white tracking-widest">J . A . R . V . I . S</h1>
                <p className="text-[10px] text-cyan-400/80 font-mono">AUTENTICAÇÃO POR CHAVE</p>
              </div>
            </div>

            <div className="flex rounded-xl bg-[#050b15] p-1 border border-cyan-500/20 mb-6">
              <button onClick={() => setAuthMode('login')} className={`flex-1 py-2 text-xs font-semibold rounded-lg ${authMode === 'login' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'text-slate-400'}`}>Entrar</button>
              <button onClick={() => setAuthMode('register')} className={`flex-1 py-2 text-xs font-semibold rounded-lg ${authMode === 'register' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'text-slate-400'}`}>Cadastrar</button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="flex items-center gap-2 bg-[#050b15] border border-cyan-500/30 rounded-xl px-3 py-2.5">
                  <Key className="w-4 h-4 text-cyan-400" />
                  <input type="text" placeholder="Chave Única (Ex: JVS-8F2A-999)" value={loginKey} onChange={(e) => setLoginKey(e.target.value.toUpperCase())} className="bg-transparent text-xs text-white outline-none w-full font-mono" required />
                </div>
                <button type="submit" disabled={isLoading} className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'INICIALIZAR J.A.R.V.I.S'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <input type="text" placeholder="Nome" value={regName} onChange={(e) => setRegName(e.target.value)} className="bg-[#050b15] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs w-full text-white" required />
                <input type="email" placeholder="E-mail" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="bg-[#050b15] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs w-full text-white" required />
                <button type="submit" disabled={isLoading} className="w-full py-3 bg-cyan-500 text-black font-bold text-xs rounded-xl">GERAR CHAVE</button>
                {generatedKey && <p className="text-center font-mono text-cyan-300 text-xs mt-2">Sua Chave: {generatedKey}</p>}
              </form>
            )}
          </div>

          <div className="md:col-span-6 bg-[#09101f]/80 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
            <h2 className="text-xs font-bold text-cyan-300 font-mono uppercase border-b border-cyan-500/20 pb-2">Modo WAKE-WORD Ativo</h2>
            <div className="space-y-3 text-xs text-slate-300 my-auto">
              <p>📍 Fale <strong className="text-cyan-400">"JARVIS"</strong>.</p>
              <p>📍 Ele responderá: <strong className="text-emerald-400">"Olá senhor, como posso ajudar?"</strong></p>
              <p>📍 Em seguida, fale seu comando normalmente.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------------- */
  /* DASHBOARD PRINCIPAL                                                   */
  /* --------------------------------------------------------------------- */
  return (
    <div className="bg-[#050811] text-slate-100 min-h-screen p-3 flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* HEADER SUPERIOR */}
      <header className="bg-[#09101f]/90 border border-cyan-500/20 rounded-2xl px-5 py-3 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-bold tracking-widest text-lg text-white">J . A . R . V . I . S</h1>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${systemState === 'WAITING_FOR_COMMAND' ? 'bg-amber-400 animate-ping' : systemState === 'SPEAKING' ? 'bg-emerald-400 animate-bounce' : 'bg-cyan-400 animate-pulse'}`} />
            <span className="font-mono text-[11px] font-bold">
              {systemState === 'WAITING_FOR_COMMAND' ? 'AGUARDANDO SEU COMANDO...' : systemState === 'SPEAKING' ? 'JARVIS FALANDO' : 'AGUARDANDO "JARVIS"...'}
            </span>
          </div>

          <LogOut className="w-4 h-4 hover:text-red-400 cursor-pointer" onClick={handleLogout} title="Sair" />
          <div className="text-right border-l border-slate-800 pl-4 font-mono">
            <div className="font-bold text-white">{formattedTime}</div>
          </div>
        </div>
      </header>

      {/* PAINEL CENTRAL DO REATOR DE ARC */}
      {activeTab === 'Inicio' && (
        <div className="grid grid-cols-12 gap-3 my-3 flex-1 items-stretch">
          
          <div className="col-span-12 lg:col-span-8 bg-[#09101f]/80 border border-cyan-500/20 rounded-2xl p-6 flex flex-col items-center justify-between backdrop-blur-md relative shadow-[0_0_30px_rgba(0,240,255,0.05)]">
            
            <div className="w-full flex items-center justify-between border-b border-cyan-500/15 pb-3 font-mono text-xs">
              <span className="text-cyan-300">ESCUTA CONTÍNUA VIVA-VOZ</span>
              <span className="text-slate-400">Diga: <strong className="text-cyan-400">"Jarvis"</strong></span>
            </div>

            {/* REATOR VISUAL */}
            <div className="flex flex-col items-center justify-center my-auto py-6">
              <div className="relative flex items-center justify-center">
                <div className={`w-56 h-56 rounded-full border ${systemState === 'WAITING_FOR_COMMAND' ? 'border-amber-400/60' : systemState === 'SPEAKING' ? 'border-emerald-400/60' : 'border-cyan-500/20'} animate-spin absolute`} style={{ animationDuration: '20s' }} />
                <div className={`w-48 h-48 rounded-full border-2 border-dashed ${systemState === 'WAITING_FOR_COMMAND' ? 'border-amber-400' : systemState === 'SPEAKING' ? 'border-emerald-400' : 'border-cyan-400/40'} animate-spin absolute`} style={{ animationDirection: 'reverse', animationDuration: '12s' }} />

                <div className={`w-36 h-36 rounded-full border-4 ${systemState === 'WAITING_FOR_COMMAND' ? 'border-amber-400 shadow-[0_0_40px_#fbbf24]' : systemState === 'SPEAKING' ? 'border-emerald-400 shadow-[0_0_40px_#10b981]' : 'border-cyan-400 shadow-[0_0_40px_#00f0ff]'} flex flex-col items-center justify-center bg-[#050b15] z-10 transition-all duration-500`}>
                  {systemState === 'SPEAKING' ? (
                    <Volume2 className="w-6 h-6 text-emerald-400 animate-pulse mb-1" />
                  ) : (
                    <Mic className={`w-6 h-6 mb-1 ${systemState === 'WAITING_FOR_COMMAND' ? 'text-amber-400 animate-bounce' : 'text-cyan-400'}`} />
                  )}
                  <span className="font-bold tracking-widest text-white text-xs font-mono">
                    {systemState === 'WAITING_FOR_COMMAND' ? 'OUVINDO' : systemState === 'SPEAKING' ? 'FALANDO' : 'JARVIS'}
                  </span>
                  <span className="text-[8px] text-cyan-400/80 font-mono mt-0.5">
                    {systemState === 'WAITING_FOR_COMMAND' ? 'FALE O COMANDO' : systemState === 'SPEAKING' ? 'FALANDO...' : 'SISTEMA PRONTO'}
                  </span>
                </div>
              </div>

              {/* ONDAS SONORAS */}
              <div className="flex items-center gap-1.5 h-8 mt-6">
                {[30, 60, 20, 85, 40, 100, 70, 90, 30, 80, 50, 95, 40, 70, 20, 60].map((h, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full transition-all duration-200 ${systemState === 'WAITING_FOR_COMMAND' ? 'bg-amber-400 animate-pulse' : systemState === 'SPEAKING' ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400/30'}`}
                    style={{ height: systemState !== 'PASSIVE' ? `${h}%` : '20%', animationDelay: `${i * 0.05}s` }} 
                  />
                ))}
              </div>
            </div>

            {/* CAIXA DE MENSAGENS */}
            <div className="w-full space-y-2">
              <div className="bg-[#050b15]/90 border border-cyan-500/20 rounded-xl p-3 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span><strong className="text-cyan-400 font-mono">{user?.name}:</strong> "{lastUserMessage}"</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200 pt-2 border-t border-slate-800">
                  <Volume2 className={`w-3.5 h-3.5 ${systemState === 'SPEAKING' ? 'text-emerald-400' : 'text-cyan-400'}`} />
                  <span><strong className="text-emerald-400 font-mono">JARVIS:</strong> "{lastJarvisResponse}"</span>
                </div>
              </div>

              {/* INPUT ALTERNATIVO DIGITADO */}
              <form onSubmit={(e) => { e.preventDefault(); handleProcessCommand(inputMessage); setInputMessage(''); }} className="flex items-center gap-2 bg-[#080e1a] border border-cyan-500/20 rounded-xl px-3 py-2">
                <input
                  type="text"
                  placeholder="Digite um comando diretamente se preferir..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="bg-transparent text-xs text-white outline-none flex-1 placeholder:text-slate-600"
                />
                <button type="submit" className="text-cyan-400"><Send className="w-4 h-4" /></button>
              </form>
            </div>

          </div>

          {/* COLUNA DIREITA */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="rounded-2xl border border-cyan-500/20 bg-[#070d18] p-4 text-center">
              <p className="text-xs italic text-slate-300 font-serif">"O segredo do futuro é estar preparado para ele hoje."</p>
              <p className="text-[10px] text-cyan-400 font-bold mt-2 font-mono">— J.A.R.V.I.S OS</p>
            </div>

            <div className="bg-[#09101f]/80 border border-cyan-500/15 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2 text-xs font-bold text-white">
                <span>Clima Atual</span>
                <span className="text-[10px] text-slate-400">São José - RN</span>
              </div>
              <div className="flex items-center gap-3">
                <Sun className="w-8 h-8 text-yellow-400" />
                <div>
                  <div className="text-lg font-bold text-white font-mono">27°C</div>
                  <div className="text-[10px] text-slate-400">Céu ensolarado</div>
                </div>
              </div>
            </div>

            <div className="bg-[#09101f]/80 border border-cyan-500/15 rounded-2xl p-4 flex-1">
              <h3 className="text-xs font-bold text-white mb-3">Aplicativos Integrados</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                {quickApps.map((app, i) => {
                  const Icon = app.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-9 h-9 rounded-xl ${app.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] text-slate-400">{app.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#09101f]/90 border border-cyan-500/20 rounded-2xl px-5 py-2 text-center text-[10px] text-cyan-300/80 font-mono">
        SISTEMA EM ESCUTA CONTÍNUA • PALAVRA-CHAVE: "JARVIS"
      </footer>

    </div>
  );
}