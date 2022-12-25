import { player } from '@/controllers/player';

//Слушатель событий с сетки
export function GridListener() {
  const $myGrid = document.querySelector('.my-grid');
  const $enemyGrid = document.querySelector('.enemy-grid');

  const listenerMyGrid = () => {
    $myGrid?.addEventListener('click', (event) => {
      event.stopPropagation();
      //@ts-ignore
      const elem = event.target?.classList[0];

      //@ts-ignore
      if (event.target.classList.contains('active')) {
        //@ts-ignore
        event.target.classList.remove('active');
        player.deleteShip(elem);
        return;
      }

      //@ts-ignore
      event.target.classList.add('active');
      player.setShips(elem);
    });
  };

  const listenerEnemyGrid = () => {
    $enemyGrid?.addEventListener('click', (event) => {
      event.stopPropagation();
      //@ts-ignore
      const elem = event.target.classList[0];
      //@ts-ignore
      event.target.classList.add('shot');
      player.shotAtShip(elem);
    });
  };

  listenerEnemyGrid();
  listenerMyGrid();
}

GridListener();
