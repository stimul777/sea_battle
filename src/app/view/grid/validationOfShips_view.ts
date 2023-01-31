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

  let previousElem = $sector?.previousSibling as HTMLElement; //активный предыдущий элемент
  let nextElem = $sector?.nextSibling as HTMLElement; //активный следующий элемент

  // const getNearElement = (element: any, type: string) => {
  //   if (type === 'previous') {
  //     return element?.previousSibling;
  //   }
  //   if (type === 'next') {
  //     return element?.nextSibling;
  //   }
  // };

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
      const elSearchPlus = document.querySelector(
        '.' + sectors.activeSector.letter + (Number(sectors.activeSector.number) + 1),
      );
      const elSearchMinus = document.querySelector(
        '.' + sectors.activeSector.letter + (Number(sectors.activeSector.number) - 1),
      );

      if (
        (sectors.mainSector?.letter === sectors.activeSector.letter &&
          elSearchMinus &&
          elSearchPlus?.classList?.contains('active')) ||
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
