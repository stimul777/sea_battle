import { onValidations } from '@/app/view/grid/validation';
import { TDirectionShip } from '@/types/ships';

//*
//* "Мертвая" неактивная зона вокруг корабля
//*
export function getDeadZone(coordinates: any, activeSector: string, directionShip: string) {
  console.log('dead zone', coordinates, activeSector, directionShip);

  switch (directionShip) {
    case 'horizontal':
      setOnHorizontalDirection(coordinates, activeSector, directionShip);
      break;
    case 'vertical':
      setOnVerticalDirection(coordinates, activeSector, directionShip);
      break;

    case 'single':
      setOnHorizontalDirection(coordinates, activeSector, directionShip);
      setOnVerticalDirection(coordinates, activeSector, directionShip);
      break;
  }
}

// УСТАНОВКА МЕРТВОЙ ЗОНЫ ПО ВЕРТИКАЛИ
const setOnVerticalDirection = (coordinates: any, activeSector: string, directionShip: TDirectionShip) => {
  //! БРАТЬ ИЗ МОДЕЛИ. МОДЕЛЬ СЕТКИ.
  const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  let deadZoneVertical: any = {
    right: [],
    left: [],
  };

  //?соседи вертикаль: справа и слева
  //?..*+*..
  //?..*+*..
  //?..*+*..
  coordinates.sort().forEach((sector: any) => {
    let $newSectorPrevious = document?.querySelector('.' + sector)?.previousSibling as HTMLElement; //предыдущий соседний элемент
    let $newSectorNext = document?.querySelector('.' + sector)?.nextSibling as HTMLElement; // следующий соседний элемент

    if ($newSectorPrevious && $newSectorPrevious.classList[0].substring(0, 1) !== letters[letters.length - 1]) {
      onValidations($newSectorPrevious.classList[0], activeSector, directionShip)
        ? null
        : $newSectorPrevious?.classList.add('safeZone'),
        deadZoneVertical.left.push($newSectorPrevious.classList[0]);
    }

    if ($newSectorNext && $newSectorNext.classList[0].substring(0, 1) !== letters[0]) {
      onValidations($newSectorNext.classList[0], activeSector, directionShip)
        ? null
        : $newSectorNext?.classList.add('safeZone'),
        deadZoneVertical.right.push($newSectorNext.classList[0]);
    }
  });

  //?соседи вертикаль: диагональ
  //?Plus+ and Minus-
  //?....+.+.
  //?.....*..
  //?.....*..
  //?....+*+.\
  const setPointDiagonal = (points: string[]) => {
    const pointTop: string = points[0];
    const pointBottom: string = points[points.length - 1];

    const pointTopMinus: string = pointTop.substring(1, 0) + (Number(pointTop.substring(1)) - 1); //крайняя точка - 1
    const pointBottomPlus: string = pointBottom.substring(1, 0) + (Number(pointBottom.substring(1)) + 1); //крайняя точка +1

    const $topMinus = document?.querySelector('.' + pointTopMinus) as HTMLElement; // последний элемент мертвой зоны верх
    const $bottomPlus = document.querySelector('.' + pointBottomPlus) as HTMLElement; //первый элемент мертвой зоны низ

    console.log('$topMinus.classList[0].substring(1, 0)', $topMinus);

    // if ($topMinus.classList[0].substring(1, 0) !== letters[letters.length - 1]) {
    $topMinus?.classList.add('safeZone');
    // }

    $bottomPlus?.classList.add('safeZone');
  };

  if (deadZoneVertical.left.length > 0) setPointDiagonal(deadZoneVertical.left);

  if (deadZoneVertical.right.length > 0) setPointDiagonal(deadZoneVertical.right);

  setPointDiagonal(coordinates);
};

///УСТАНОВКА МЕРТВОЙ ЗОНЫ ПО ГОРИЗОНТАЛИ
const setOnHorizontalDirection = (coordinates: any, activeSector: string, directionShip: TDirectionShip) => {
  //! БРАТЬ ИЗ МОДЕЛИ. МОДЕЛЬ СЕТКИ.
  const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  let deadZoneCoordinates: any = {
    plus: [],
    minus: [],
  };

  //?
  //?соседи горизонталь
  //?формирование объекта с клетками от корабля в большую и меньшую сторону(горизонт)
  //?......++++....
  //?......****....
  //?......++++....
  coordinates.sort().forEach((sector: any) => {
    let newSectorPlus = null;
    let newSectorMinus = null;

    let sectorNumber = sector.substring(1); //number
    let sectorLetter = sector.substring(0, 1); //letter

    newSectorPlus = sectorLetter + (Number(sectorNumber) + 1);
    newSectorMinus = sectorLetter + (Number(sectorNumber) - 1);
    // }

    const $newSectorPlus = document?.querySelector('.' + newSectorPlus);
    const $newSectorMinus = document?.querySelector('.' + newSectorMinus);

    //число с плюсом уходит в несуществующую клетку
    if (Number(newSectorPlus?.substring(1)) <= letters.length) {
      deadZoneCoordinates.plus.push(newSectorPlus);
      onValidations(newSectorPlus, activeSector, directionShip) ? null : $newSectorPlus?.classList.add('safeZone');
    }

    //число с минусом уходит в несуществующую клетку
    if (Number(newSectorMinus?.substring(1)) != 0) {
      deadZoneCoordinates.minus.push(newSectorMinus);
      onValidations(newSectorMinus, activeSector, directionShip) ? null : $newSectorMinus?.classList.add('safeZone');
    }
  });

  //?
  //?соседи диагональ
  //?

  //Plus+ (down!)
  //?......++++...
  //?......****....
  //?.....++++++
  //!РАБОТАЕТ
  if (deadZoneCoordinates.plus.length > 0) {
    const lastPlus = deadZoneCoordinates.plus[coordinates.length - 1];
    const firstPlus = deadZoneCoordinates.plus[0];

    const $newLastPlus = document.querySelector('.' + lastPlus); // последний элемент мертвой зоны низ
    const $newFirstPlus = document.querySelector('.' + firstPlus); //первый элемент мертвой зоны низ

    const $dSectorPlusNext = $newLastPlus?.nextSibling as HTMLElement;
    const $dSectorPlusPrevious = $newFirstPlus?.previousSibling as HTMLElement;

    if ($dSectorPlusNext.classList[0].substring(0, 1) != letters[0].substring(0, 1)) {
      $dSectorPlusNext?.classList.add('safeZone');
    }

    if ($dSectorPlusPrevious.classList[0].substring(0, 1) != letters[letters.length - 1].substring(0, 1)) {
      $dSectorPlusPrevious?.classList.add('safeZone');
    }
  }

  //Minus- (up!)
  // //?.....++++++..
  // //?......****....
  // //?......++++
  //!РАБОТАЕТ
  if (deadZoneCoordinates.minus.length > 0) {
    const lastMinus = deadZoneCoordinates.minus[coordinates.length - 1];
    const firstMinus = deadZoneCoordinates.minus[0];

    const $newLastMinus = document.querySelector('.' + lastMinus);
    const $newFirstMinus = document.querySelector('.' + firstMinus);

    const $sectorMinusNext = $newLastMinus?.nextSibling as HTMLElement; //последний диагональ
    const $sectorMinusPrevious = $newFirstMinus?.previousSibling as HTMLElement; //первый диагональ

    if ($newLastMinus?.classList[0].substring(0, 1) != letters[letters.length - 1].substring(0, 1)) {
      $sectorMinusNext.classList.add('safeZone');
    }

    if ($sectorMinusPrevious?.classList[0].substring(0, 1) !== letters[letters.length - 1].substring(0, 1)) {
      $sectorMinusPrevious.classList.add('safeZone');
    }
  }

  //?
  //?соседи по бокам
  //?.....+****+..
  //! РАБОТАЕТ
  let last = coordinates[coordinates.length - 1];
  let first = coordinates[0];

  const $newSectorPrevious = document.querySelector('.' + first) as HTMLElement; //первая секция корабля
  const $newSectorNext = document.querySelector('.' + last) as HTMLElement; //последняя секция корабля

  let $previousElem = $newSectorPrevious?.previousSibling as HTMLElement; //предыдущий соседний элемент
  let $nextElem = $newSectorNext?.nextSibling as HTMLElement; // следующий соседний элемент

  //перед
  if ($previousElem?.classList[0].substring(0, 1) != letters[letters.length - 1].substring(0, 1)) {
    $previousElem?.classList.add('safeZone');
  }

  //после
  if ($nextElem?.classList[0].substring(0, 1) != letters[0].substring(0, 1)) {
    $nextElem?.classList.add('safeZone');
  }
};
