//Валидация кораблей на сетке
// true - валидация успешно прошла
// false - ошибка
export function onValidations(sector: string, activeSector: string): boolean {
  const $sector_dom = document.querySelector('.' + sector);
  const elem = $sector_dom.classList[0];

  let res = true;

  if (elem.substring(0, 1) != activeSector.substring(0, 1)) {
    res = false;
  } else {
    res = true;
    return res;
  }

  if (elem.substring(2, 1) != activeSector.substring(2, 1)) {
    res = false;
  } else {
    res = true;
    return res;
  }
}
