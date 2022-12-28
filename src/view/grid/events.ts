import { sound } from '@/view/sound';

// обработка выстрела противником по квадрату
function shotProcessing(isCondition: boolean, sector: string) {
  const $myGrid: HTMLElement = document.querySelector('.my-grid') as HTMLElement;
  //@ts-ignore
  const $ship = $myGrid?.querySelectorAll('.' + sector);

  if (isCondition) {
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
function shotProcessingEnemy(hit: boolean, sector: string) {
  const $myGrid: HTMLElement = document.querySelector('.enemy-grid') as HTMLElement;
  //@ts-ignore
  const $ship = $myGrid?.querySelectorAll('.' + sector);

  if (hit) {
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

export { shotProcessing, shotProcessingEnemy };
