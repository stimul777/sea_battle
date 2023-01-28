//*
//* Заморозка сетки от действий пользователя
//*!тут возможно просто стоит менять цвет сетки и блокировать клик
const create = () => {
  // const $enemy_grid_wrapper = document.querySelector('.enemy-grid_wrapper');
  const $wrapper_enemy = document.querySelector('.enemy-grid') as HTMLElement;
  const frozenGrid = document.createElement('div');

  frozenGrid.classList.add('frozenGrid');
  frozenGrid.style.height = $wrapper_enemy.offsetHeight + 'px';
  frozenGrid.style.width = $wrapper_enemy.offsetWidth + 'px';

  $wrapper_enemy.prepend(frozenGrid);
};

const onSwitch = (status: boolean) => {
  const $frozen_grid = document.querySelector('.frozenGrid') as HTMLElement;
  status ? ($frozen_grid.style.display = 'none') : ($frozen_grid.style.display = 'flex');
};

export { create as setFrozenGrid, onSwitch as setFrozenSwitch };
