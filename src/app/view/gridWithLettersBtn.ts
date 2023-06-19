//*
//* Чекбокс для скрытия\показа на игровой сетке букв и цифр(А1, A2 и тд)
//*
export function onShowGridBtn() {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-settings') as HTMLElement;

  const container: HTMLElement = document.createElement('div');
  container.classList.add('container-checkbox-grid');

  const checkbox: HTMLInputElement = document.createElement('input');
  checkbox.classList.add('checkbox-grid');
  checkbox.type = 'checkbox';

  const text: HTMLElement = document.createElement('span');
  text.innerHTML = '';

  container.append(checkbox, text);
  $wrapper.append(container);
}

// function startGame(button: HTMLElement) {
//   //!слушатель удалять, да и кнопку из дом тоже
//   button.addEventListener('click', () => {
//     const enemyWrapper: HTMLElement = document.querySelector('.enemy-grid_wrapper') as HTMLElement;
//     button.style.display = 'none';
//     enemyWrapper.style.display = 'grid';
//     setFrozenGrid();
//   });
// }
