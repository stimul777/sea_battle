//*
//* Валидация кораблей на сетке
//* sector - выбранный сектор
//* selectedMainSector - сектор в котором расставляется корабль(самый первый квадрат)
//* directionShip - направление установки корабля
//* true - валидация успешно прошла
//* false - ошибка
//*
export function onValidations(sector: string, selectedMainSector: string, directionShip: string): boolean {
  if (directionShip === '') return true;

  const $sector = document.querySelector('.' + sector);
  const elem = $sector?.classList[0];

  const getNearElement = (element: any, type: string) => {
    if (type === 'previous') {
      return element?.previousSibling;
    }
    if (type === 'next') {
      return element?.nextSibling;
    }
  };

  let previousElem = getNearElement($sector, 'previous'); //активен ли предыдущий соседний элемент
  let nextElem = getNearElement($sector, 'next'); //активен ли следующий соседний элемент

  const sectors = {
    mainSector: {
      letter: selectedMainSector.substring(0, 1),
      number: selectedMainSector.substring(2, 1),
    },
    activeSector: {
      letter: elem?.substring(0, 1),
      number: elem?.substring(2, 1),
    },
  };

  let result = false;

  switch (directionShip) {
    case 'vertical':
      //!не дает ставить по вертикали через клетку, но по диагонали ставится
      const elSearchPlus = document.querySelector(
        '.' + sectors.activeSector.letter + (Number(sectors.activeSector.number) + 1),
      );
      const elSearchMinus = document.querySelector(
        '.' + sectors.activeSector.letter + (Number(sectors.activeSector.number) - 1),
      );

      if (
        (sectors.mainSector?.letter === sectors.activeSector.letter && elSearchPlus?.classList?.contains('active')) ||
        elSearchMinus?.classList?.contains('active')
      ) {
        result = true;
      }
      break;

    case 'horizontal':
      if (
        (sectors.mainSector?.number === sectors.activeSector.number && previousElem?.classList?.contains('active')) ||
        nextElem?.classList?.contains('active')
      ) {
        result = true;
      }
      break;
  }

  return result;
}
