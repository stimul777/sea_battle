// API
import { io } from 'socket.io-client';
const socket = io();
import { player } from '@/controllers/player';

// Выстрел по противнику
export function setShot(value: string) {
  console.log('Выстрел в противника:', value);
  socket.emit('shot', value);
}

// Сообщить противнику о попадании или промахе
export function msgShot(value: boolean) {
  socket.emit('msg-shot', value);
}

// Сокет инитится сразу и висит постоянно
socket.on('shot-emit', function (value) {
  player.shotAtMe(value);
});

socket.on('msg-shot-emit', function (value) {
  player.msgToPlayer(value);
});
