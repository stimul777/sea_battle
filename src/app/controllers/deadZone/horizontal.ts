import { onValidations } from '@/app/controllers/validation';
import state from '@/app/controllers/state';

import { TDirectionShip } from '@/types/ships';

//*
//* Установка мертвой зоны вокруг корабля ГОРИЗОНТАЛЬ
//*
export default function setOnHorizontalDirection(
  coordinates: string[],
  activeSector: string,
  directionShip: TDirectionShip,
) {
  let deadZoneCoordinates: any = {
    plus: [],
    minus: [],
  };

  //если у элемента есть уже есть safeZone - пропустить его
  const setSafeZone = ($elem: HTMLElement) => {
    if (!$elem.classList.contains('safeZone')) {
      onValidations($elem.classList[0], activeSector, directionShip) ? null : $elem.classList.add('safeZone');
    }
  };

  //?формирование объекта с клетками от корабля в большую и меньшую сторону(горизонт)
  //?......++++....
  //?......****....
  //?......++++....
  coordinates.sort().forEach((sector: string) => {
    let sectorPlus: string | null = null;
    let sectorMinus: string | null = null;

    let sectorNumber = sector.substring(1); //number
    let sectorLetter = sector.substring(0, 1); //letter

    sectorPlus = sectorLetter + (Number(sectorNumber) + 1);
    sectorMinus = sectorLetter + (Number(sectorNumber) - 1);

    const $sectorPlus = document?.querySelector('.' + sectorPlus) as HTMLElement;
    const $sectorMinus = document?.querySelector('.' + sectorMinus) as HTMLElement;

    //число с плюсом уходит в несуществующую клетку
    if (Number(sectorPlus?.substring(1)) <= state.letters.length) {
      deadZoneCoordinates.plus.push(sectorPlus);
      setSafeZone($sectorPlus);
    }

    //число с минусом уходит в несуществующую клетку
    if (Number(sectorMinus?.substring(1)) != 0) {
      deadZoneCoordinates.minus.push(sectorMinus);
      setSafeZone($sectorMinus);
    }
  });

  const setPointDiagonal = (points: string[]) => {
    const lastElement: string = points[coordinates.length - 1];
    const firstElement: string = points[0];

    const $lastElement = document.querySelector('.' + lastElement) as HTMLElement; // последний элемент мертвой зоны низ
    const $firstElement = document.querySelector('.' + firstElement) as HTMLElement; //первый элемент мертвой зоны низ

    const $nextElement = $lastElement?.nextSibling as HTMLElement;
    const $previousElement = $firstElement?.previousSibling as HTMLElement;

    if ($nextElement.classList[0].substring(0, 1) != state.letters[0].substring(0, 1)) {
      $nextElement?.classList.add('safeZone');
    }

    if ($previousElement.classList[0].substring(0, 1) != state.letters[state.letters.length - 1].substring(0, 1)) {
      $previousElement?.classList.add('safeZone');
    }
  };

  if (deadZoneCoordinates.plus.length > 0) {
    setPointDiagonal(deadZoneCoordinates.plus);
  }

  if (deadZoneCoordinates.minus.length > 0) {
    setPointDiagonal(deadZoneCoordinates.minus);
  }

  //?
  //?соседи по бокам
  //?.....+****+..
  let pointLast: string = coordinates[coordinates.length - 1];
  let pointFirst: string = coordinates[0];

  const $pointFirst = document.querySelector('.' + pointFirst) as HTMLElement; //первая секция корабля
  const $pointLast = document.querySelector('.' + pointLast) as HTMLElement; //последняя секция корабля

  let $previousElement = $pointFirst?.previousSibling as HTMLElement; //предыдущий соседний элемент
  let $nextElement = $pointLast?.nextSibling as HTMLElement; // следующий соседний элемент

  //перед
  if ($previousElement?.classList[0].substring(0, 1) != state.letters[state.letters.length - 1].substring(0, 1)) {
    $previousElement?.classList.add('safeZone');
  }

  //после
  if ($nextElement?.classList[0].substring(0, 1) != state.letters[0].substring(0, 1)) {
    $nextElement?.classList.add('safeZone');
  }
}
