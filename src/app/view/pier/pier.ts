import { TShips, TShip } from '@/types/ships';

//*
//* Обновление количества пришвартованных кораблей на пирсе
//*
export function onPier<T extends TShips>(ships: T): void {
  const $pier = document.querySelector('.pier') as HTMLElement;

  if (!$pier) return createPier(ships);

  for (let key in ships) {
    const value: TShip = ships[key] as TShip;

    const $p: HTMLParagraphElement | null = document.querySelector('.pier-list_counter-' + value.name);
    $p ? ($p.textContent = value.name + ': ' + value.quantity) : '-';

    const $ship: NodeListOf<ChildNode> | undefined = document.querySelector(
      '.pier-list__ships-container_' + value.name,
    )?.childNodes;

    if (value.quantity != $ship?.length) {
      if ($ship) $ship[0].remove();
    } else {
      //добавить корабль
    }
  }
}

//*
//* Создание пирса и швартовка кораблей
//*
const createPier = (ships: any) => {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-pier') as HTMLElement;

  const _div: HTMLDivElement = document.createElement('div');
  _div.classList.add('pier');

  const _ul: HTMLUListElement = document.createElement('ul');
  _ul.classList.add('pier-list');

  _div.append(_ul);

  for (let key in ships) {
    const value = ships[key];

    const _li: HTMLLIElement = document.createElement('li');
    _li.classList.add('pier-list__element');

    const p: HTMLParagraphElement = document.createElement('p');
    p.classList.add('pier-list_counter', 'pier-list_counter-' + value.name);
    p.textContent = value.name + ': ' + value.quantity;

    const _divElementContainer: HTMLDivElement = document.createElement('div');
    _divElementContainer.classList.add('pier-list__ships-container', 'pier-list__ships-container_' + value.name);

    let count = 1;
    while (count <= value.quantity) {
      count++;
      const _divShip = document.createElement('div') as HTMLElement;
      _divShip.classList.add('pier__ship-view');
      _divElementContainer.append(_divShip);
    }

    _li.append(p, _divElementContainer);
    _ul.appendChild(_li);
  }

  $wrapper.prepend(_div);
};
