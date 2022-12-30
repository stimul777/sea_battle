import { player } from '@/app/controllers/player';
import { ships } from '@/app/controllers/ships';
import { sound } from '@/app/view/sound';

//Слушатель событий с сетки
export function GridListener() {
  const $myGrid = document.querySelector('.my-grid');
  const $enemyGrid = document.querySelector('.enemy-grid');

  const listenerMyGrid = () => {
    $myGrid?.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      if (ships.ships === 0) return;
      //@ts-ignore
      const elem = event.target?.classList[0];

      //@ts-ignore
      if (event.target.classList.contains('active')) {
        //@ts-ignore
        event.target.classList.remove('active');
        ships.setShip('remove');
        player.deleteShip(elem);
        return;
      }

      //@ts-ignore
      event.target.classList.add('active');
      ships.setShip('add');
      player.setShips(elem);
    });
  };

  const listenerEnemyGrid = () => {
    $enemyGrid?.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      //@ts-ignore
      if (event.target.classList.contains('shot')) return;

      //@ts-ignore
      const elem = event.target.classList[0];
      //@ts-ignore
      event.target.classList.add('shot');
      sound('shot');
      player.shotAtShip(elem);
    });
  };

  listenerEnemyGrid();
  listenerMyGrid();
}

GridListener();
