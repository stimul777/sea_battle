import { TShip } from '@/types/ships';
import { sound } from '@/app/view/sound_view';
import { onValidations } from '@/app/view/grid/validationOfShips_view';
import { ships } from '@/app/controllers/ships_control';

//Слушатель событий с сетки
export function gridListener() {
  const $myGrid = document.querySelector('.my-grid');
  const $enemyGrid = document.querySelector('.enemy-grid');
  const { setSound } = sound();

  let activeSector: string = ''; //активный сектор установки моего корабля

  const listenerMyGrid = () => {
    $myGrid?.addEventListener('click', (event: Event) => {
      event.stopPropagation();

      if (ships.ships === 0) return;

      //@ts-ignore
      const elem = event.target?.classList[0];

      if (activeSector === '') activeSector = elem;

      let validation = onValidations(elem, activeSector);
      if (!validation) return;

      //установка/удаление корабля
      //@ts-ignore
      if (event.target.classList.contains('active')) {
        //@ts-ignore
        event.target.classList.remove('active');
        ships.setShips(elem, 'remove');
        ships.deleteShip(elem);
        return;
      } else {
        //@ts-ignore
        event.target.classList.add('active');
        const isShipInstalled: TShip | undefined = ships.setShips(elem, 'add');
        if (isShipInstalled) {
          activeSector = ''; //удалить активный сектор;
          isShipInstalled.coordinates
            .flatMap((f) => f)
            .forEach((sector: string) => {
              const elem = document.querySelector('.' + sector);
              elem?.classList.add('ship-is-installed');
            });
        }
      }
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