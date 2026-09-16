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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server JARVIS rodando na porta ${PORT}`));