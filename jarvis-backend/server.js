const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Inicializa o banco de dados SQLite local
const db = new Database('jarvis.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    access_key TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// 2. Injeta ou Atualiza a Chave Mestra VIP para o seu e-mail
const masterKey = 'JVS-MASTER-777';
const masterEmail = 'gleydsondbrito@gmail.com';

const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(masterEmail);

if (existingUser) {
  // Se o e-mail já existe, força a chave a ser a Master Key
  db.prepare('UPDATE users SET access_key = ? WHERE email = ?').run(masterKey, masterEmail);
  console.log(`🔑 CHAVE MESTRA VINCULADA AO SEU E-MAIL: ${masterKey}`);
} else {
  // Se não existe, cria do zero
  db.prepare('INSERT INTO users (name, email, access_key) VALUES (?, ?, ?)').run(
    'Gleydson Brito',
    masterEmail,
    masterKey
  );
  console.log(`🔑 CHAVE MESTRA CRIADA COM SUCESSO: ${masterKey}`);
}

/* --------------------------------------------------------------------- */
/* MOTOR MULTI-IA COM FALLBACK (GROQ -> GEMINI -> OPENROUTER)           */
/* --------------------------------------------------------------------- */

const SYSTEM_PROMPT = `Você é o J.A.R.V.I.S., assistente pessoal inteligente do senhor Gleydson. Responda de forma extremamente objetiva, elegante e concisa (no máximo 2 frases curtas) para ser lida em voz alta:`;

async function callGroq(userMessage) {
  if (!process.env.GROQ_API_KEY) throw new Error("Chave GROQ_API_KEY ausente no .env");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ]
    })
  });

  if (!response.ok) throw new Error(`Groq status ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}

async function callGemini(userMessage) {
  if (!process.env.GEMINI_API_KEY) throw new Error("Chave GEMINI_API_KEY ausente no .env");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nUsuário disse: ${userMessage}` }] }]
    })
  });

  if (!response.ok) throw new Error(`Gemini status ${response.status}`);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text;
}

async function callOpenRouter(userMessage) {
  if (!process.env.OPENROUTER_API_KEY) throw new Error("Chave OPENROUTER_API_KEY ausente no .env");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ]
    })
  });

  if (!response.ok) throw new Error(`OpenRouter status ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}

/* --------------------------------------------------------------------- */
/* ROTAS DA API                                                          */
/* --------------------------------------------------------------------- */

// ROTA: Login por Chave Única
app.post('/api/login', (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ error: 'Chave não informada.' });
  }

  const user = db
    .prepare('SELECT name, email, access_key FROM users WHERE access_key = ?')
    .get(key.trim().toUpperCase());

  if (!user) {
    return res.status(404).json({ error: 'Chave de acesso inválida ou inexistente.' });
  }

  return res.json({ success: true, user });
});

// ROTA: Processamento Inteligente de Voz/Chat com Alternância Automática
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensagem não informada.' });
  }

  let reply = null;

  // 1ª Tentativa: Groq (Ultra rápido)
  try {
    reply = await callGroq(message);
    console.log("⚡ Resposta gerada via GROQ");
  } catch (err1) {
    console.warn("⚠️ Groq indisponível. Redirecionando para Gemini...", err1.message);

    // 2ª Tentativa: Gemini (Backup 1)
    try {
      reply = await callGemini(message);
      console.log("⚡ Resposta gerada via GEMINI");
    } catch (err2) {
      console.warn("⚠️ Gemini indisponível. Redirecionando para OpenRouter...", err2.message);

      // 3ª Tentativa: OpenRouter (Backup 2)
      try {
        reply = await callOpenRouter(message);
        console.log("⚡ Resposta gerada via OPENROUTER");
      } catch (err3) {
        console.error("❌ Todos os provedores de IA falharam:", err3.message);
      }
    }
  }

  if (reply) {
    return res.json({ reply });
  } else {
    return res.status(500).json({ reply: "Desculpe, senhor. Todos os meus módulos de inteligência estão ocupados no momento." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server JARVIS rodando na porta ${PORT} com suporte Multi-IA`));