const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const CONTENT_FILE = path.join(__dirname, '..', 'public', 'content.json');
const ADMIN_PASSWORD = 'drsport2024';

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/content', (req, res) => {
  const data = fs.readFileSync(CONTENT_FILE, 'utf8');
  res.json(JSON.parse(data));
});

app.put('/api/content', (req, res) => {
  const auth = req.headers['authorization'];
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2), 'utf8');
  res.json({ ok: true });
});

app.listen(3001, () => console.log('Admin server running on http://localhost:3001'));
