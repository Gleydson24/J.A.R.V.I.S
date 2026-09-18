import React, { useState } from 'react';
import {
  Mic, Cpu, LayoutGrid, Globe, Calendar, RefreshCw, Download, Play,
  Monitor, Smartphone, ChevronDown, Sparkles, Heart,
  TrendingUp, Target, ShieldCheck, HardDrive, Zap, Palette
} from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import ArcReactor from './components/ArcReactor';
import NeuralBackground from './components/NeuralBackground';

const PROTOCOLS = {
  cyan: {
    id: 'cyan',
    name: 'Stark Cyan',
    hex: '#00f0ff',
    badge: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    text: 'text-cyan-400',
    bgBtn: 'bg-cyan-500 hover:bg-cyan-400 text-black',
    glowBtn: 'shadow-[0_0_25px_rgba(0,240,255,0.5)]',
    border: 'border-cyan-500/30 hover:border-cyan-400',
    dot: 'bg-cyan-400'
  },
  red: {
    id: 'red',
    name: 'Hulkbuster',
    hex: '#ff2a2a',
    badge: 'bg-red-500/10 border-red-500/30 text-red-400',
    text: 'text-red-400',
    bgBtn: 'bg-red-500 hover:bg-red-400 text-black',
    glowBtn: 'shadow-[0_0_25px_rgba(255,42,42,0.5)]',
    border: 'border-red-500/30 hover:border-red-400',
    dot: 'bg-red-400'
  },
  gold: {
    id: 'gold',
    name: 'JARVIS Gold',
    hex: '#eab308',
    badge: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    text: 'text-yellow-400',
    bgBtn: 'bg-yellow-500 hover:bg-yellow-400 text-black',
    glowBtn: 'shadow-[0_0_25px_rgba(234,179,8,0.5)]',
    border: 'border-yellow-500/30 hover:border-yellow-400',
    dot: 'bg-yellow-400'
  },
  green: {
    id: 'green',
    name: 'Matrix Green',
    hex: '#22c55e',
    badge: 'bg-green-500/10 border-green-500/30 text-green-400',
    text: 'text-green-400',
    bgBtn: 'bg-green-500 hover:bg-green-400 text-black',
    glowBtn: 'shadow-[0_0_25px_rgba(34,197,94,0.5)]',
    border: 'border-green-500/30 hover:border-green-400',
    dot: 'bg-green-400'
  }
};

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeProtocol, setActiveProtocol] = useState('cyan');

  const protocol = PROTOCOLS[activeProtocol];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "O J.A.R.V.I.S é realmente 100% gratuito?",
      a: "Sim! O J.A.R.V.I.S é um projeto totalmente gratuito com todos os recursos de IA, automação e comandos de voz liberados sem qualquer mensalidade ou custo oculto."
    },
    {
      q: "Em quais plataformas o J.A.R.V.I.S está disponível?",
      a: "Atualmente a versão principal do sistema foi desenvolvida para Windows (10 e 11). As versões para Android e iOS estão em fase ativa de desenvolvimento."
    },
    {
      q: "Preciso de internet para usar?",
      a: "Para o processamento de voz de alta precisão e respostas inteligentes das APIs de IA (Groq, Gemini, OpenRouter), é necessária uma conexão ativa com a internet."
    },
    {
      q: "Como faço para atualizar o app?",
      a: "O próprio executável possui um verificador de atualizações automático que notifica você sempre que uma nova versão estável for lançada."
    },
    {
      q: "O J.A.R.V.I.S funciona em outros idiomas?",
      a: "A interface e os modelos de reconhecimento foram otimizados originalmente em Português (Brasil), mas o motor de IA responde nativamente em mais de 30 idiomas."
    }
  ];

 return (
  <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans">

    {/* FUNDO INTERATIVO DE REDE NEURAL */}
    <NeuralBackground colorHex={protocol.hex} />
      

      {/* FUNDO INTERATIVO DE PARTÍCULAS EM CANVAS */}
      <ParticleBackground color={protocol.hex} />

      {/* GLOW DE FUNDO DA PÁGINA */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] blur-[160px] pointer-events-none rounded-full transition-colors duration-500"
        style={{ backgroundColor: `${protocol.hex}20` }}
      />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#050b15]/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
              style={{ borderColor: protocol.hex, boxShadow: `0 0 15px ${protocol.hex}` }}
            >
              <span className="font-bold text-sm" style={{ color: protocol.hex }}>J</span>
            </div>
            <span className="font-bold tracking-[0.2em] text-white text-base">J . A . R . V . I . S</span>
          </div>

          {/* SELETOR DE PROTOCOLO DE CORES */}
          <div className="hidden lg:flex items-center gap-2 bg-[#09101f]/90 border border-slate-800 px-3 py-1.5 rounded-full backdrop-blur-md">
            <Palette className="w-3.5 h-3.5 text-slate-400 mr-1" />
            <span className="text-[10px] font-mono text-slate-400 mr-1 uppercase">Matriz:</span>
            {Object.values(PROTOCOLS).map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProtocol(p.id)}
                className={`w-5 h-5 rounded-full transition-transform hover:scale-125 flex items-center justify-center ${
                  activeProtocol === p.id ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: p.hex }}
                title={p.name}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#inicio" className="hover:text-white transition-colors">Início</a>
            <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
            <a href="#download" className="hover:text-white transition-colors">Download</a>
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <a href="#download" className={`px-5 py-2.5 font-bold text-xs rounded-xl transition-all ${protocol.bgBtn} ${protocol.glowBtn}`}>
            Baixar App
          </a>
        </div>
      </nav>

      {/* SEÇÃO 1: HERO */}
      <section id="inicio" className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono transition-colors ${protocol.badge}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${protocol.dot}`} />
            Mais que um assistente.
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            J . A . R . V . I . S<br />
            <span className="transition-colors duration-500" style={{ color: protocol.hex }}>
              Sua inteligência artificial pessoal.
            </span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Um assistente completo, projetado para tornar o seu dia mais produtivo, organizado e conectado. 
            Com tecnologia avançada de voz, IA e automação, o J.A.R.V.I.S entende você, aprende com você e trabalha por você.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#download" className={`flex items-center gap-2 px-6 py-3.5 font-bold text-xs rounded-xl transition-all ${protocol.bgBtn} ${protocol.glowBtn}`}>
              <Download className="w-4 h-4" /> Baixar Agora
            </a>
            <button className="flex items-center gap-2 px-6 py-3.5 bg-[#09101f] border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl hover:bg-slate-800 transition-all">
              <Play className="w-4 h-4 fill-current" style={{ color: protocol.hex }} /> Assista ao Vídeo
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono pt-3">
            <span className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5" style={{ color: protocol.hex }} /> Disponível para Windows</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-slate-500" /> Em breve para Android</span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-slate-500" /> Em breve para iOS</span>
          </div>

          {/* ESTATÍSTICAS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800">
            <div>
              <div className="text-xl font-bold text-white font-mono">+10K</div>
              <div className="text-[11px] text-slate-400">Usuários em Testes</div>
            </div>
            <div>
              <div className="text-xl font-bold font-mono" style={{ color: protocol.hex }}>99%</div>
              <div className="text-[11px] text-slate-400">Reconhecimento de Voz</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">24/7</div>
              <div className="text-[11px] text-slate-400">Sempre Online</div>
            </div>
            <div>
              <div className="text-xl font-bold font-mono" style={{ color: protocol.hex }}>100%</div>
              <div className="text-[11px] text-slate-400">Focado em Você</div>
            </div>
          </div>
        </div>

        {/* REATOR DE ARC INTERATIVO 3D */}
        <div className="lg:col-span-5 flex justify-center relative">
          <ArcReactor colorHex={protocol.hex} />
        </div>
      </section>

      {/* SEÇÃO 2: RECURSOS */}
      <section id="recursos" className="py-20 bg-[#050b15]/60 border-y border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: protocol.hex }}>Recursos</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Tudo o que você precisa, em um só lugar.</h2>
            <p className="text-slate-400 text-sm">O J.A.R.V.I.S reúne o melhor da tecnologia para te oferecer uma experiência única, intuitiva e poderosa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Mic, title: "Comandos de Voz", desc: "Interaja de forma natural e rápida em tempo real com ativação por palavra-chave." },
              { icon: Cpu, title: "Automação", desc: "Deixe o J.A.R.V.I.S fazer o trabalho repetitivo por você no seu computador." },
              { icon: LayoutGrid, title: "Aplicativos", desc: "Abra seus softwares e sites favoritos instantaneamente com um simples comando." },
              { icon: Globe, title: "Informações", desc: "Pesquise na Internet, consulte dados e tire dúvidas com inteligência artificial." },
              { icon: Calendar, title: "Organização", desc: "Mantenha sua agenda, lembretes e tarefas pessoais sempre organizados e em dia." },
              { icon: RefreshCw, title: "Rotina", desc: "Crie rotinas automatizadas personalizadas para adaptar o assistente ao seu dia." },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-[#09101f]/80 border border-slate-800 rounded-2xl p-6 transition-all hover:border-slate-600 group backdrop-blur-md">
                  <div 
                    className="w-12 h-12 rounded-xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ borderColor: `${protocol.hex}40`, backgroundColor: `${protocol.hex}10` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: protocol.hex }} />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          <blockquote className="mt-16 text-center italic text-slate-300 font-serif text-sm border-t border-slate-800 pt-8">
            "O futuro não é algo que simplesmente acontece, é algo que você constrói."
            <footer className="not-italic text-xs font-mono font-bold mt-2" style={{ color: protocol.hex }}>— J.A.R.V.I.S</footer>
          </blockquote>
        </div>
      </section>

      {/* SEÇÃO 3: DOWNLOAD */}
      <section id="download" className="py-20 max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: protocol.hex }}>| Download</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Leve o J.A.R.V.I.S para onde você for.</h2>
            <p className="text-slate-400 text-sm">
              Baixe agora gratuitamente e comece a viver uma nova experiência de produtividade, inteligência e praticidade.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button className={`flex items-center gap-2 px-6 py-3.5 font-bold text-xs rounded-xl transition-all ${protocol.bgBtn} ${protocol.glowBtn}`}>
                <Download className="w-4 h-4" /> Baixar para Windows
              </button>
              <button disabled className="flex items-center gap-2 px-6 py-3.5 bg-slate-800/50 border border-slate-700 text-slate-500 font-semibold text-xs rounded-xl cursor-not-allowed">
                Em breve para Android
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#09101f]/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="font-bold text-white text-sm font-mono border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" style={{ color: protocol.hex }} /> Requisitos do sistema (Windows)
            </h3>
            
            <ul className="space-y-3 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-3">
                <Monitor className="w-4 h-4" style={{ color: protocol.hex }} />
                <span><strong>SO:</strong> Windows 10 ou superior (64-bit)</span>
              </li>
              <li className="flex items-center gap-3">
                <Cpu className="w-4 h-4" style={{ color: protocol.hex }} />
                <span><strong>Processador:</strong> Intel i3 / AMD Ryzen 3 ou superior</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-4 h-4" style={{ color: protocol.hex }} />
                <span><strong>RAM:</strong> 4 GB (Recomendado 8 GB)</span>
              </li>
              <li className="flex items-center gap-3">
                <HardDrive className="w-4 h-4" style={{ color: protocol.hex }} />
                <span><strong>Espaço em disco:</strong> 500 MB livre</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Também disponível em breve:</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-slate-500"><Smartphone className="w-3.5 h-3.5" /> Android</span>
                <span className="flex items-center gap-1 text-slate-500"><Smartphone className="w-3.5 h-3.5" /> iOS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: SOBRE */}
      <section id="sobre" className="py-20 bg-[#050b15]/60 border-y border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: protocol.hex }}>Sobre</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Um projeto feito com propósito.</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                O J.A.R.V.I.S nasceu de uma ideia simples: criar um assistente pessoal acessível que realmente faça a diferença na vida das pessoas. 
                Mais do que apenas tecnologia, é um projeto focado em aprendizado contínuo, inovação e utilidade prática diária.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { title: "Inovação", desc: "Sempre além do básico.", icon: Sparkles },
                  { title: "Respeito", desc: "Com as pessoas e dados.", icon: Heart },
                  { title: "Aprendizado", desc: "Evolução constante.", icon: TrendingUp },
                  { title: "Propósito", desc: "Tecnologia com sentido.", icon: Target },
                ].map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div key={idx} className="bg-[#09101f] border border-slate-800 p-4 rounded-xl">
                      <Icon className="w-5 h-5 mb-2" style={{ color: protocol.hex }} />
                      <h4 className="font-bold text-white text-xs">{val.title}</h4>
                      <p className="text-[10px] text-slate-400">{val.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-gradient-to-b from-slate-800/40 to-transparent border border-slate-700 p-8 rounded-3xl backdrop-blur-md text-center space-y-4">
                <div 
                  className="w-16 h-16 rounded-full border mx-auto flex items-center justify-center"
                  style={{ borderColor: protocol.hex, boxShadow: `0 0 20px ${protocol.hex}` }}
                >
                  <span className="font-bold text-xl" style={{ color: protocol.hex }}>J</span>
                </div>
                <p className="text-xs text-slate-300 italic font-serif">
                  "A tecnologia é mais poderosa quando serve às pessoas."
                </p>
                <div className="text-xs font-mono font-bold" style={{ color: protocol.hex }}>— J.A.R.V.I.S</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: FAQ */}
      <section id="faq" className="py-20 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: protocol.hex }}>FAQ</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Dúvidas frequentes</h2>
          <p className="text-slate-400 text-sm">Encontre aqui as respostas para as perguntas mais comuns sobre o J.A.R.V.I.S.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#09101f]/90 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-md">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left font-semibold text-xs md:text-sm text-white flex justify-between items-center gap-4 hover:bg-slate-800/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} style={{ color: protocol.hex }} />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BANNER CTA PRÉ-FOOTER */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto bg-[#09101f] border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl backdrop-blur-md">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: protocol.hex }}>
                <span className="text-[10px] font-bold" style={{ color: protocol.hex }}>J</span>
              </div>
              <span className="font-bold text-white text-sm tracking-widest">J . A . R . V . I . S</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">Seja parte desta revolução.</h3>
            <p className="text-slate-400 text-xs">Baixe agora e tenha sua própria inteligência artificial no computador.</p>
          </div>

          <a href="#download" className={`px-8 py-4 font-bold text-xs rounded-xl transition-all whitespace-nowrap ${protocol.bgBtn} ${protocol.glowBtn}`}>
            Baixar App Grátis
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 bg-[#02050c] relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            J.A.R.V.I.S © 2026. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a href="#sobre" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#sobre" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#faq" className="hover:text-white transition-colors">Contato</a>
          </div>
        </div>
      </footer>

    </div>
  );
}