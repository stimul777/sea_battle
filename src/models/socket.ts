// API
import { io } from 'socket.io-client';
const socket = io();
import { player } from '@/controllers/player';

// Выстрел по противнику
export function setShot(value: string) {
  console.log('Выстрел!', value);
  socket.emit('shot', value);
}

// Сокет инитится сразу и висит постоянно
socket.on('shot-emit', function (value) {
  console.log('START SOCKET-client', value);
  player.shotAtMe(value);
});
