//Построение игровой сетки
import { ships } from '@/controllers/ships';

export function onPier(): void {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-pier') as HTMLElement;
  $wrapper.innerHTML = `<ul><li>battleship: ${ships.shipsRang.battleship}</li><li>cruisers: ${ships.shipsRang.cruisers}</li><li>destroyers: ${ships.shipsRang.destroyers}</li><li>boats: ${ships.shipsRang.boats}</li></ul>`;
}

onPier();
