import { TShip, TDirectionShip } from '@/types/ships';
import { sound } from '@/app/models/sound';
import { onValidations } from '@/app/view/grid/validation';
import { getDeadZone } from '@/app/view/grid/deadZone_view';
import { ships } from '@/app/models/ships';
import { colorGenerator } from '@/helpers/colorGenerator';

//*
//* Слушатель сетки.
//* Валидация, удаление, добавление, мертвая зона кораблей
//*
export function gridListener() {
  const $myGrid = document.querySelector('.my-grid');
  // const $myGridSectors = $myGrid?.childNodes;
  const $enemyGrid = document.querySelector('.enemy-grid');

  let activeSector: string = ''; //активный сектор установки моего корабля
  let directionShip: TDirectionShip = '';

  const listenerMyGrid = () => {
    $myGrid?.addEventListener('click', (event: any) => {
      //!если начать ставить диаганально - ставятся.
      if (
        ships.shipsCounter === 0 ||
        event.target.classList.contains('safeZone') ||
        event.target?.classList[0] === 'my-grid'
      )
        return;

      const elem = event.target?.classList[0];

      if (activeSector === '') activeSector = elem;

      if (ships.shipsCounter <= 4) {
        directionShip = 'single';
      }

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
        const isShipInstalled: TShip | undefined = ships.setShips(elem); //установлен ли корабль?

        //корабль установлен
        if (isShipInstalled) {
          let colorShip = colorGenerator();
          isShipInstalled.coordinates
            .flatMap((f) => f)
            .forEach((sector: string) => {
              const setElem = document.querySelector('.' + sector) as HTMLElement;
              setElem.classList.add('ship-is-installed');
              setElem.style.backgroundColor = colorShip;
            });

          getDeadZone(
            isShipInstalled?.coordinates.find((ships) => ships.find((sector) => sector === elem)),
            activeSector,
            directionShip,
          );

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
