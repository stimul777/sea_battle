//*
//* Валидация кораблей на сетке
//* sector - выбранный сектор
//* selectedMainSector - сектор в котором расставляется корабль(самый первый квадрат)
//* true - валидация успешно прошла
//* false - ошибка
//*
export function onValidations(sector: string, selectedMainSector: string): boolean {
  console.log('+sector', sector);
  console.log('selectedMainSector', selectedMainSector);
  const $sector = document.querySelector('.' + sector);
  const elem = $sector?.classList[0];
  // const $grid = document.querySelector('.my-grid')?.children;

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

  let result = true;

  //сравнение по букве и по номеру
  if (
    sectors.mainSector?.letter === sectors.activeSector.letter ||
    sectors.mainSector?.number === sectors.activeSector.number
  ) {
    result = true;
  }

  //сравнение соседей
  if (previousElem?.classList?.contains('ship-is-installed') || nextElem?.classList?.contains('ship-is-installed')) {
    result = false;
  }

  //!не дает ставить по вертикали через клетку, но по диагонали ставится
  const elSearchPlus = document.querySelector(
    '.' + sectors.activeSector.letter + (Number(sectors.activeSector.number) + 1),
  );
  const elSearchMinus = document.querySelector(
    '.' + sectors.activeSector.letter + (Number(sectors.activeSector.number) - 1),
  );

  if (
    elSearchPlus?.classList?.contains('ship-is-installed') ||
    elSearchMinus?.classList?.contains('ship-is-installed')
  ) {
    result = false;
  }

  return result;
}
