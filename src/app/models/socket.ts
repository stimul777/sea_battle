// API
import { io } from 'socket.io-client';
const socket = io();
import { player } from '@/app/controllers/player';
import { tShot } from '@/types/ships';

// Выстрел по противнику
export function setShot(value: string): void {
  socket.emit('shot', value);
}

// Сокет инитится сразу и висит постоянно
socket.on('shot-emit', function (value: string) {
  player.shotAtMe(value);
});

// Сообщить противнику о попадании или промахе
export function msgShot(value: tShot): void {
  socket.emit('msg-shot_listener', value);
}

socket.on('msg-shot_listener_emit', function (value: tShot): void {
  player.msgToPlayer(value);
});
