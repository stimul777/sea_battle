import { TShip } from '@/types/ships';
import { sound } from '@/app/controllers/sound_control';
import { onValidations } from '@/app/view/grid/validationOfShips_view';
import { getDeadZone } from '@/app/view/grid/deadZone_view';
import { ships } from '@/app/controllers/ships_control';
import { colorGenerator } from '@/helpers/colorGenerator';

//Слушатель событий с сетки
export function gridListener() {
  const $myGrid = document.querySelector('.my-grid');
  const $enemyGrid = document.querySelector('.enemy-grid');

  let activeSector: string = ''; //активный сектор установки моего корабля

  const listenerMyGrid = () => {
    $myGrid?.addEventListener('click', (event: any) => {
      event.stopPropagation();
      if (ships.ships === 0) return;

      const elem = event.target?.classList[0];

      if (activeSector === '') activeSector = elem;

      let validation = onValidations(elem, activeSector);
      if (!validation) {
        event.target.classList.add('error');
        setTimeout(() => {
          event?.target?.classList.remove('error');
        }, 500);
        return;
      }

      //установка/удаление корабля
      if (event.target.classList.contains('active')) {
        event.target.classList.remove('active');
        ships.setShips(elem, 'remove');
        ships.deleteShip(elem);
        return;
      } else {
        event.target.classList.add('active');
        const isShipInstalled: TShip | undefined = ships.setShips(elem, 'add');
        if (isShipInstalled) {
          let colorShip = colorGenerator();
          activeSector = ''; //удалить активный сектор;
          isShipInstalled.coordinates
            .flatMap((f) => f)
            .forEach((sector: string) => {
              const elem = document.querySelector('.' + sector) as HTMLElement;
              elem.classList.add('ship-is-installed');
              elem.style.backgroundColor = colorShip;
            });

          getDeadZone(isShipInstalled.coordinates.flatMap((f) => f));
        }
      }
    });
  };

  const listenerEnemyGrid = () => {
    $enemyGrid?.addEventListener('click', (event: any) => {
      event.stopPropagation();
      if (event.target.classList.contains('shot')) return;

      const elem = event.target.classList[0];

      event.target.classList.add('shot');
      sound.setSound('shot');
      ships.shotAtShip(elem);
    });
  };

  listenerEnemyGrid();
  listenerMyGrid();
}

gridListener();
