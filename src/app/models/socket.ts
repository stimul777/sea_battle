// API
import { io } from 'socket.io-client';
const socket = io();
import { ships } from '@/app/controllers/ships_control';
import { tShot } from '@/types/ships';

// Выстрел по противнику
export function setShot(value: string): void {
  socket.emit('shot', value);
}

// Сокет инитится сразу и висит постоянно
socket.on('shot-emit', function (value: string) {
  ships.shotAtMe(value);
});

// Сообщить противнику о попадании или промахе
export function msgShot(value: tShot): void {
  socket.emit('msg-shot_listener', value);
}

socket.on('msg-shot_listener_emit', function (value: tShot): void {
  ships.msgToPlayer(value);
});
