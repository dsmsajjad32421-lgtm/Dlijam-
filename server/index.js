require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '../client')));
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', game: 'Neon World' });
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Neon World running on port ' + PORT));
