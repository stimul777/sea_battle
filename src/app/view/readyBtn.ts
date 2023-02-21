import { setFrozenGrid } from '@/app/view/grid/frozenGrid';

export function onReadyBtn() {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-settings') as HTMLElement;

  const container: HTMLElement = document.createElement('div');
  const button: HTMLElement = document.createElement('button');

  button.classList.add('button-ready');
  button.innerText = 'Я ГОТОВ КИЛИТЬ!!!1';
  container.append(button);
  $wrapper.append(container);

  startGame(button);
}

function startGame(button: HTMLElement) {
  //!слушатель удалять, да и кнопку из дом тоже
  button.addEventListener('click', () => {
    const enemyWrapper: HTMLElement = document.querySelector('.enemy-grid_wrapper') as HTMLElement;
    button.style.display = 'none';
    enemyWrapper.style.display = 'grid';
    setFrozenGrid();
  });
}
