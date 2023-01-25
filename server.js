import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// paths
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = 3000;
const connections = [];

// socket
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
// kill CORS
app.use(express.static(__dirname + '/dist'));

//socket connection
io.on('connection', (socket) => {
  connections.push(socket);

  // выстрел по противнику
  socket.on('shot', (value) => {
    socket.broadcast.emit('shot-emit', value);
  });

  // Сообщение противнику о попадании\промахе
  socket.on('msg-shot_listener', (value) => {
    socket.broadcast.emit('msg-shot_listener_emit', value);
  });

  // Сообщение противнику о победе
  socket.on('msg-finish_listener', (value) => {
    socket.broadcast.emit('msg-finish_emit', value);
  });

  socket.on('disconnect', (value) => {
    console.log('disconnect');
  });
});

//socket listen
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
