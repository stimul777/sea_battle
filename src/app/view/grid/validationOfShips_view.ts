//*
//* Валидация кораблей на сетке
//* true - валидация успешно прошла
//* false - ошибка
//*
export function onValidations(sector: string, selectedMainSector: string): boolean {
  const $sector = document.querySelector('.' + sector);
  const elem = $sector?.classList[0];
  const $grid = document.querySelector('.my-grid')?.children;

  const previousElem = $sector?.previousSibling; //активен ли предыдущий соседний элемент
  const nextElem = $sector?.nextSibling; //активен ли следующий соседний элемент

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

  //сравнение по букве
  if (sectors.mainSector?.letter === sectors.activeSector.letter) {
    console.log('letter');
    result = true;
  }

  // сравнение по номеру
  if (sectors.mainSector?.number === sectors.activeSector.number) {
    console.log('number');
    result = true;
  }

  //сравнение соседей
  if (previousElem?.classList?.contains('ship-is-installed') || nextElem?.classList?.contains('ship-is-installed')) {
    console.log('сосед активен', previousElem, nextElem);
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
    console.log('zone+++', elSearchPlus);
    console.log('zone---', elSearchMinus);
    result = false;
  }

  return result;
}
