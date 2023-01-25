import { onValidations } from '@/app/view/grid/validationOfShips_view';

//*
//* "Мертвая" неактивная зона вокруг корабля
//*
export function getDeadZone(coordinates: Array<string>, activeSector: string, directionShip: string) {
  console.log('dead zone', coordinates, activeSector, directionShip);

  let deadZoneCoordinats = {
    plus: [],
    minus: [],
  };

  coordinates.forEach((sector) => {
    let newSectorPlus = null;
    let newSectorMinus = null;

    if (directionShip === 'horizontal') {
      let sectorNumber = sector.substring(2, 1);
      let sectorLetter = sector.substring(0, 1);
      newSectorPlus = sectorLetter + (Number(sectorNumber) + 1);
      newSectorMinus = sectorLetter + (Number(sectorNumber) - 1);
    }

    const $newSectorPlus = document.querySelector('.' + newSectorPlus);
    const $newSectorMinus = document.querySelector('.' + newSectorMinus);
    //@ts-ignore
    deadZoneCoordinats.plus.push(newSectorPlus);
    //@ts-ignore
    deadZoneCoordinats.minus.push(newSectorMinus);
    //@ts-ignore

    onValidations(newSectorPlus, activeSector, directionShip) ? null : $newSectorPlus?.classList.add('safeZone');
    //@ts-ignore

    onValidations(newSectorMinus, activeSector, directionShip) ? null : $newSectorMinus?.classList.add('safeZone');
  });

  //соседи диагональ Plus
  const lastPlus = deadZoneCoordinats.plus[coordinates.length - 1];
  const firstPlus = deadZoneCoordinats.plus[0];

  const $newLastPlus = document.querySelector('.' + lastPlus);
  const $newFirstPlus = document.querySelector('.' + firstPlus);
  //@ts-ignore

  const $dSectorPlusNext = $newLastPlus.nextSibling;
  //@ts-ignore

  const $dSectorPlusPrevius = $newFirstPlus.previousSibling;
  //@ts-ignore

  $dSectorPlusPrevius.classList.add('safeZone');
  //@ts-ignore

  $dSectorPlusNext.classList.add('safeZone');

  //соседи диагональ Minus
  const lastMinus = deadZoneCoordinats.minus[coordinates.length - 1];
  const firstMinus = deadZoneCoordinats.minus[0];

  const $newLastMinus = document.querySelector('.' + lastMinus);
  const $newFirstMinus = document.querySelector('.' + firstMinus);

  const $sectorMinusNext = $newLastMinus?.nextSibling;
  const $sectorMinusPrevius = $newFirstMinus?.previousSibling;

  if ($sectorMinusNext) {
    //@ts-ignore

    $sectorMinusNext.classList.add('safeZone');
  }

  if ($sectorMinusPrevius) {
    //@ts-ignore

    $sectorMinusPrevius.classList.add('safeZone');
  }

  // соседи по бокам
  let last = coordinates[coordinates.length - 1];
  let first = coordinates[0];

  const $newSectorPrevius = document.querySelector('.' + first);
  const $newSectorNext = document.querySelector('.' + last);

  let $previousElem = $newSectorPrevius?.previousSibling; //предыдущий соседний элемент
  let $nextElem = $newSectorNext?.nextSibling; // следующий соседний элемент
  //@ts-ignore

  if ($nextElem) $nextElem.classList.add('safeZone');
  //@ts-ignore

  if ($previousElem) $previousElem.classList.add('safeZone');
}
