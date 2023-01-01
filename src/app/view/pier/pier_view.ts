//Построение игровой сетки
import { ships } from '@/app/controllers/ships_control';

export function onPier(): void {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-pier') as HTMLElement;
  $wrapper.innerHTML = `<ul><li>battleship: ${ships.shipsRang.battleship}</li><li>cruisers: ${ships.shipsRang.cruisers}</li><li>destroyers: ${ships.shipsRang.destroyers}</li><li>boats: ${ships.shipsRang.boats}</li></ul>`;
}
