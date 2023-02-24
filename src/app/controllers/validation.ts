import { TDirectionShip } from '@/types/ships';

//*
//* Валидация кораблей на сетке
//* @sector - выбранный сектор
//* @selectedMainSector - сектор в котором расставляется корабль(самый первый квадрат)
//* @directionShip - направление установки корабля
//* true - валидация успешно прошла
//* false - ошибка
//*
export function onValidations(sector: string, selectedMainSector: string, directionShip: TDirectionShip): boolean {
  console.log('onValidations', selectedMainSector, directionShip);
  if (directionShip === '') return true;

  const $sector = document.querySelector('.' + sector);
  const elem = $sector?.classList[0];

  const sectors = {
    mainSector: {
      letter: selectedMainSector.substring(1, 0),
      number: selectedMainSector.substring(1),
    },
    activeSector: {
      letter: elem?.substring(1, 0),
      number: elem?.substring(1),
    },
  };

  let previousElem = $sector?.previousSibling as HTMLElement; //активный предыдущий элемент
  let nextElem = $sector?.nextSibling as HTMLElement; //активный следующий элемент

  const $pointPlus = document.querySelector(
    '.' + sectors.activeSector.letter + (Number(sectors.activeSector.number) + 1),
  );
  const $pointMinus = document.querySelector(
    '.' + sectors.activeSector.letter + (Number(sectors.activeSector.number) - 1),
  );

  let isResult = false;

  switch (directionShip) {
    case 'vertical':
      if (
        (sectors.mainSector?.letter === sectors.activeSector.letter &&
          //! убрано, не дает ставить вверх вертикаль(l-1) $pointMinus &&
          $pointPlus?.classList?.contains('active')) ||
        $pointMinus?.classList?.contains('active')
      ) {
        isResult = true;
      }
      break;

    case 'horizontal':
      if (
        (sectors.mainSector.number === sectors.activeSector.number && previousElem?.classList.contains('active')) ||
        nextElem?.classList.contains('active')
      ) {
        isResult = true;
      }
      break;

    case 'single':
      if (
        sectors.mainSector?.letter === sectors.activeSector.letter ||
        sectors.mainSector?.number === sectors.activeSector.number
      ) {
        isResult = true;
      }
      break;
  }

  return isResult;
}
