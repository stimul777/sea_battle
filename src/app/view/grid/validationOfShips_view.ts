//Валидация кораблей на сетке
// true - валидация успешно прошла
// false - ошибка
export function onValidations(sector: string, activeSector: string): boolean {
  const $sector = document.querySelector('.' + sector);
  const elem = $sector?.classList[0];

  //const previousElem = $sector.previousSibling.classList[2]; //активен ли предыдущий соседний элемент
  //const nextElem = $sector.nextSibling.classList[2]; //активен ли следующий соседний элемент

  let res = false;

  //сравнение по букве
  if (elem?.substring(0, 1) === activeSector.substring(0, 1)) {
    res = true;
  }

  // сравнение по номеру
  if (elem?.substring(2, 1) === activeSector.substring(2, 1)) {
    res = true;
  }

  return res;
}
