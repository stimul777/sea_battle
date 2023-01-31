import { onValidations } from '@/app/view/grid/validationOfShips_view';

//*
//* "Мертвая" неактивная зона вокруг корабля
//* coordinates - координаты установленного корабля
//*
export function getDeadZone(coordinates: any, activeSector: string, directionShip: string) {
  console.log('dead zone', coordinates, activeSector, directionShip);

  let deadZoneCoordinates: any = {
    plus: [],
    minus: [],
  };

  coordinates.sort().forEach((sector: any) => {
    let newSectorPlus = null;
    let newSectorMinus = null;

    if (directionShip === 'horizontal') {
      let sectorNumber = sector.substring(2, 1); //letter;
      let sectorLetter = sector.substring(0, 1); //number

      newSectorPlus = sectorLetter + (Number(sectorNumber) + 1);
      newSectorMinus = sectorLetter + (Number(sectorNumber) - 1);
    }

    const $newSectorPlus = document.querySelector('.' + newSectorPlus);
    const $newSectorMinus = document.querySelector('.' + newSectorMinus);

    deadZoneCoordinates.plus.push(newSectorPlus);
    deadZoneCoordinates.minus.push(newSectorMinus);

    onValidations(newSectorPlus, activeSector, directionShip) ? null : $newSectorPlus?.classList.add('safeZone');
    onValidations(newSectorMinus, activeSector, directionShip) ? null : $newSectorMinus?.classList.add('safeZone');
  });

  //?
  //?соседи диагональ
  //?......++++...
  //?......****....
  //?.....++++++

  //Plus+
  const lastPlus = deadZoneCoordinates.plus[coordinates.length - 1];
  const firstPlus = deadZoneCoordinates.plus[0];
  console.log('lastPlus', lastPlus);
  console.log('firstPlus', firstPlus);

  const $newLastPlus = document.querySelector('.' + lastPlus);
  const $newFirstPlus = document.querySelector('.' + firstPlus);

  const $dSectorPlusNext = $newLastPlus?.nextSibling as HTMLElement;
  const $dSectorPlusPrevious = $newFirstPlus?.previousSibling as HTMLElement;

  $dSectorPlusPrevious.classList.add('safeZone');
  $dSectorPlusNext.classList.add('safeZone');

  // Minus+
  const lastMinus = deadZoneCoordinates.minus[coordinates.length - 1];
  const firstMinus = deadZoneCoordinates.minus[0];

  console.log('lastMinus', lastMinus);
  console.log('firstMinus', firstMinus);

  const $newLastMinus = document.querySelector('.' + lastMinus);
  const $newFirstMinus = document.querySelector('.' + firstMinus);

  const $sectorMinusNext = $newLastMinus?.nextSibling as HTMLElement;
  const $sectorMinusPrevious = $newFirstMinus?.previousSibling as HTMLElement;

  if ($sectorMinusNext) {
    $sectorMinusNext.classList.add('safeZone');
  }

  if ($sectorMinusPrevious) {
    $sectorMinusPrevious.classList.add('safeZone');
  }

  //?
  //?соседи по бокам
  //?.....+****+..
  let last = coordinates[coordinates.length - 1];
  let first = coordinates[0];

  const $newSectorPrevious = document.querySelector('.' + first) as HTMLElement;
  const $newSectorNext = document.querySelector('.' + last) as HTMLElement;

  let $previousElem = $newSectorPrevious?.previousSibling as HTMLElement; //предыдущий соседний элемент
  let $nextElem = $newSectorNext?.nextSibling as HTMLElement; // следующий соседний элемент

  if ($nextElem) $nextElem?.classList.add('safeZone');
  if ($previousElem) $previousElem.classList.add('safeZone');
}
