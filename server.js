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
// socket
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
// kill CORS
app.use(express.static(__dirname + '/dist'));

//socket
io.on('connection', (socket) => {
  socket.on('test-shot', (msg) => {
    io.emit('test-shot', msg);
    console.log('tst shot-server', msg);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
