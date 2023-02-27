import { TShips, TShip } from '@/types/ships';

//*
//* Обновление количества пришвартованных кораблей на пирсе
//*
export function onPier<T extends TShips>(ships: T): void {
  const $pier = document.querySelector('.pier') as HTMLElement;

  if (!$pier) return createPier(ships);

  for (let key in ships) {
    const value: TShip = ships[key] as TShip;

    const li = document.querySelector('.pier__' + value.name) as HTMLElement;
    li.textContent = value.name + ': ' + value.quantity;

    const $ship: NodeListOf<Element> = document.querySelectorAll('.pier_ship-view-' + value.name);

    if (value.quantity != $ship.length) $ship[0].remove();
  }
}

//*
//* Создание пирса и швартовка кораблей
//*
const createPier = <T extends TShips>(ships: any) => {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-pier') as HTMLElement;

  const _div: HTMLDivElement = document.createElement('div');
  _div.classList.add('pier');

  const _ul: HTMLUListElement = document.createElement('ul');
  _ul.classList.add('pier-list');

  const _divForShip = document.createElement('div');
  _divForShip.classList.add('ships-container');

  _div.append(_ul, _divForShip);

  const shipsName: string[] = [];

  // for (let key in ships) {
  //   shipsName.push(ships[key].name);
  // }

  Object.keys(ships).forEach((key) => {
    const value: TShip = ships[key];
    shipsName.push(value.name);
  });

  for (let i = 0; i <= shipsName.length - 1; i++) {
    const _li: HTMLLIElement = document.createElement('li');
    _li.textContent = `${shipsName[i] + ': ' + ships[shipsName[i]].quantity}`;

    const nameLi = 'pier__' + ships[shipsName[i]].name;

    _li.classList.add(nameLi);
    _ul.appendChild(_li);

    const _container = document.createElement('div') as HTMLElement;
    _container.classList.add('ships-container__ship');

    for (let counter = 1; counter <= ships[shipsName[i]].quantity; counter++) {
      const _div: HTMLDivElement = document.createElement('div');
      _div.classList.add('pier_ship-view', 'pier_ship-view-' + ships[shipsName[i]].name);
      _container.append(_div);
      _divForShip.append(_container);
    }
  }

  $wrapper.prepend(_div);
};
