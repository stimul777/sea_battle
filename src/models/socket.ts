// API
import { io } from 'socket.io-client';
const socket = io();
import { player } from '@/controllers/player';

// Выстрел по противнику
export function setShot(value: string) {
  socket.emit('shot', value);
}

// Сокет инитится сразу и висит постоянно
socket.on('shot-emit', function (value) {
  player.shotAtMe(value);
});

// Сообщить противнику о попадании или промахе
export function msgShot(hit: boolean, value: string) {
  socket.emit('msg-shot_listener', { hit, value });
}

socket.on('msg-shot_listener_emit', function (value) {
  player.msgToPlayer(value);
});
