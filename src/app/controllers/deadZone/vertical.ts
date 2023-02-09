import { onValidations } from '@/app/controllers/validation';
import state from '@/app/controllers/state';

import { TDirectionShip } from '@/types/ships';

//*
//* Установка мертвой зоны вокруг корабля ВЕРТИКАЛЬ
//*
export default function setOnVerticalDirection(coordinates: any, activeSector: string, directionShip: TDirectionShip) {
  let deadZoneVertical: any = {
    right: [],
    left: [],
  };

  const setSafeZone = ($elem: HTMLElement) => {
    if (!$elem.classList.contains('safeZone')) {
      onValidations($elem.classList[0], activeSector, directionShip) ? null : $elem.classList.add('safeZone');
    }
  };

  //?соседи вертикаль: справа и слева
  //?..*+*..
  //?..*+*..
  //?..*+*..
  coordinates.forEach((sector: any) => {
    const $pointPrevious = document?.querySelector('.' + sector)?.previousSibling as HTMLElement; //предыдущий соседний элемент
    const $pointNext = document?.querySelector('.' + sector)?.nextSibling as HTMLElement; // следующий соседний элемент

    const points = {
      letterPrevious: $pointPrevious?.classList[0].substring(0, 1),
      letterNext: $pointNext?.classList[0].substring(0, 1),
    };

    if ($pointPrevious && points.letterPrevious !== state.letters[state.letters.length - 1]) {
      setSafeZone($pointPrevious);
      deadZoneVertical.left.push($pointPrevious.classList[0]);
    }

    if ($pointNext && points.letterNext !== state.letters[0]) {
      setSafeZone($pointNext);
      deadZoneVertical.right.push($pointNext.classList[0]);
    }
  });

  //?соседи вертикаль: диагональ
  //?Plus+ and Minus-
  //?....+.+.
  //?.....*..
  //?.....*..
  //?....+*+.
  const setPointDiagonal = (points: string[]) => {
    const pointTop: string = points[0];
    const pointBottom: string = points[points.length - 1];

    const pointTopMinus: string = pointTop.substring(1, 0) + (Number(pointTop.substring(1)) - 1); //крайняя точка - 1
    const pointBottomPlus: string = pointBottom.substring(1, 0) + (Number(pointBottom.substring(1)) + 1); //крайняя точка +1

    const $topMinus = document?.querySelector('.' + pointTopMinus) as HTMLElement; // последний элемент мертвой зоны верх
    const $bottomPlus = document.querySelector('.' + pointBottomPlus) as HTMLElement; //первый элемент мертвой зоны низ

    $topMinus?.classList.add('safeZone');
    $bottomPlus?.classList.add('safeZone');
  };

  if (deadZoneVertical.left.length > 0) setPointDiagonal(deadZoneVertical.left);

  if (deadZoneVertical.right.length > 0) setPointDiagonal(deadZoneVertical.right);

  setPointDiagonal(coordinates);
}
