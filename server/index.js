
require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'online', game: 'Dli World', version: '1.0.0' });
});

app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    gameName: 'Dli World',
    version: '1.0.0',
    characters: [
      { id: 'pink_goggles', name: 'Pink Goggles', color: '#ff2d78', default: true },
      { id: 'blue_shadow',  name: 'Blue Shadow',  color: '#00d4ff', default: false },
      { id: 'travel_buddy', name: 'Travel Buddy', color: '#00ff88', default: false },
      { id: 'neon_hero',    name: 'Neon Hero',    color: '#ff6a00', default: false }
    ]
  });
});

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  socket.on('join_zone', (data) => {
    socket.join(data.zone || 'neon_city');
    socket.to(data.zone || 'neon_city').emit('player_joined', { id: socket.id });
  });
  socket.on('player_move', (data) => {
    socket.to(data.zone || 'neon_city').emit('other_player_move', { id: socket.id, ...data });
  });
  socket.on('disconnect', () => {
    io.emit('player_left', { id: socket.id });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Dli World running on port ' + PORT));
