// Установить глобально
import { io } from "socket.io-client";

const socket = io();

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`

  socket.emit('test-send', 777);

   socket.on('test-send', function(msg) {
      console.log('START SOCKET', msg)
  });

    
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}


  


