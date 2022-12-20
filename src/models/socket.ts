import { io } from 'socket.io-client';
const socket = io();

export function onSocket(shot: string) {
  socket.emit('test-shot', shot);
  socket.on('test-shot', function (msg) {
    console.log('START SOCKET-client', msg);
  });
}
