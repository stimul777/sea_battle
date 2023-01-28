import { TShip, TDirectionShip } from '@/types/ships';
import { sound } from '@/app/controllers/sound_control';
import { onValidations } from '@/app/view/grid/validationOfShips_view';
// import { getDeadZone } from '@/app/view/grid/deadZone_view';
import { ships } from '@/app/controllers/ships_control';
import { colorGenerator } from '@/helpers/colorGenerator';

//Слушатель событий с сетки
export function gridListener() {
  const $myGrid = document.querySelector('.my-grid');
  // const $myGridSectors = $myGrid?.childNodes;
  const $enemyGrid = document.querySelector('.enemy-grid');

  let activeSector: string = ''; //активный сектор установки моего корабля
  let directionShip: TDirectionShip = '';

  const listenerMyGrid = () => {
    $myGrid?.addEventListener('click', (event: any) => {
      if (
        ships.shipsCounter === 0 ||
        event.target.classList.contains('safeZone') ||
        event.target?.classList[0] === 'my-grid'
      )
        return;

      const elem = event.target?.classList[0];

      if (activeSector === '') activeSector = elem;

      if (activeSector !== elem) {
        //определение направления корабля по букве (ВЕРТИКАЛЬ)
        if (activeSector.substring(0, 1) === elem.substring(0, 1) && directionShip !== 'horizontal') {
          directionShip = 'vertical';
        }
        //определение направления корабля по цифре(ГОРИЗОНТАЛЬ)
        if (activeSector.substring(2, 1) === elem.substring(2, 1) && directionShip !== 'vertical') {
          directionShip = 'horizontal';
        }
      }

      let validation = onValidations(elem, activeSector, directionShip);
      if (!validation) {
        event.target.classList.add('error');
        setTimeout(() => {
          event?.target?.classList.remove('error');
        }, 500);
        return;
      }

      //установка/удаление сектора корабля
      if (event.target.classList.contains('active')) {
        event.target.classList.remove('active');
        ships.deleteShip(elem);
        return;
      } else {
        event.target.classList.add('active');
        const isShipInstalled: TShip | undefined = ships.setShips(elem);

        if (isShipInstalled) {
          let colorShip = colorGenerator();
          isShipInstalled.coordinates
            .flatMap((f) => f)
            .forEach((sector: string) => {
              const elem = document.querySelector('.' + sector) as HTMLElement;
              elem.classList.add('ship-is-installed');
              elem.style.backgroundColor = colorShip;
            });

          // getDeadZone(
          //   isShipInstalled.coordinates.flatMap((f) => f),
          //   activeSector,
          //   directionShip,
          // );

          activeSector = directionShip = ''; //удалить активный сектор;
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
