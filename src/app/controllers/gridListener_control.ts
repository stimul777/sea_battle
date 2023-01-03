import { sound } from '@/app/view/sound_view';
import { onValidations } from '@/app/view/grid/validationOfShips_view';
import { ships } from '@/app/controllers/ships_control';

//Слушатель событий с сетки
export function gridListener() {
  const $myGrid = document.querySelector('.my-grid');
  const $enemyGrid = document.querySelector('.enemy-grid');
  const { setSound } = sound();

  let activeSector: string = ''; //активный сектор установки корабля

  const listenerMyGrid = () => {
    $myGrid?.addEventListener('click', (event: Event) => {
      event.stopPropagation();

      if (ships.ships === 0) return;

      //@ts-ignore
      const elem = event.target?.classList[0];

      if (activeSector === '') {
        activeSector = elem;
      }

      let validation = onValidations(elem, activeSector);
      if (!validation) return;
      // activeSector = '';

      //@ts-ignore
      if (event.target.classList.contains('active')) {
        //@ts-ignore
        event.target.classList.remove('active');
        ships.setShip('remove');
        ships.deleteShip(elem);
        return;
      }

      //@ts-ignore
      event.target.classList.add('active');
      ships.setShip('add');
      ships.setShips(elem);
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
      setSound('shot');
      ships.shotAtShip(elem);
    });
  };

  listenerEnemyGrid();
  listenerMyGrid();
}

gridListener();
