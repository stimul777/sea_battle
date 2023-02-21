// API
import { io } from 'socket.io-client';
const socket = io();
import { ships } from '@/app/models/Ships';
import { player } from '@/app/models/Player';
import { tShot } from '@/types/ships';
import { TStatus } from '@/types/player';

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

// Сообщить противнику о победе
export function onFinish(value: TStatus): void {
  socket.emit('msg-finish_listener', value);
}
socket.on('msg-finish_emit', function (value: TStatus): void {
  player.endGame(value);
});
