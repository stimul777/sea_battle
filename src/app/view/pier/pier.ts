import { TShips } from '@/types/ships';

//*
//* Информация о количестве кораблей
//*
export function onPier(ships: TShips): void {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-pier') as HTMLElement;
  $wrapper.innerHTML = `<ul><li>battleship: ${ships.battleship.quantity}</li><li>cruisers: ${ships.cruisers.quantity}</li><li>destroyers: ${ships.destroyers.quantity}</li><li>boats: ${ships.boats.quantity}</li></ul>`;
}
