import { sound } from '@/app/view/sound';
import { tShot } from '@/types/ships';

// обработка выстрела противником по квадрату
function getMyShot(value: tShot) {
  const $myGrid: HTMLElement = document.querySelector('.my-grid') as HTMLElement;
  const $ship = $myGrid?.querySelectorAll('.' + value.sector);

  if (value.hit) {
    sound('hit');
    $ship[0].classList.add('square-hit-animation');
    setTimeout(() => {
      $ship[0].classList.remove('square-hit-animation');
    }, 600);
    $ship[0].classList.add('square-fire-animation');
  } else {
    sound('miss');
    $ship[0].classList.add('square-miss-animation');
    setTimeout(() => {
      $ship[0].classList.remove('square-miss-animation');
    }, 2000);
    $ship[0].classList.add('square-miss');
  }
}

// обработка моего выстрела по противнику
function getEnemyShot(value: tShot) {
  const $myGrid: HTMLElement = document.querySelector('.enemy-grid') as HTMLElement;
  const $ship = $myGrid?.querySelectorAll('.' + value.sector);

  if (value.hit) {
    sound('hit');
    $ship[0].classList.add('square-hit-animation');
    setTimeout(() => {
      $ship[0].classList.remove('square-hit-animation');
    }, 600);
    $ship[0].classList.add('square-fire-animation');
  } else {
    sound('miss');
    $ship[0].classList.add('square-miss-animation');
    setTimeout(() => {
      $ship[0].classList.remove('square-miss-animation');
    }, 2000);
    $ship[0].classList.add('square-miss');
  }
}

export { getMyShot, getEnemyShot };
