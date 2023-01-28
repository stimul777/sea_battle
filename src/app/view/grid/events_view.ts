import { sound } from '@/app/controllers/sound_control';
import { onReadyBtn } from '@/app/view/readyBtn_view';
import { setFrozenSwitch } from '@/app/view/grid/frozenGrid';

import { tShot } from '@/types/ships';

// обработка выстрела противником по квадрату
function getMyShot(value: tShot) {
  const $myGrid: HTMLElement = document.querySelector('.my-grid') as HTMLElement;
  const $ship = $myGrid?.querySelectorAll('.' + value.sector);
  getMedia(value, $ship, $myGrid);
  setFrozenSwitch(true);
}

// обработка моего выстрела по противнику
//! пока функция висит, но вообще она дубль, без доп функционала не нужна
function getEnemyShot(value: tShot) {
  const $myGrid: HTMLElement = document.querySelector('.enemy-grid') as HTMLElement;
  const $ship = $myGrid?.querySelectorAll('.' + value.sector);
  getMedia(value, $ship, $myGrid);
  setFrozenSwitch(false);
}

// Установка визуала и аудио
function getMedia(value: tShot, $ship: any, $myGrid: HTMLElement) {
  $ship[0].classList.add('square-injured');

  if (value.conditionOfShip.killed) {
    for (let sector of value.conditionOfShip.sunkenShip) {
      const $ship = $myGrid.querySelector('.' + sector);
      if ($ship?.classList.contains('square-injured')) {
        $ship?.classList.add('square-killed');
        $ship?.classList.remove('square-injured');
      }
    }
  }

  if (value.hit) {
    sound.setSound('hit');
    $ship[0].classList.add('square-hit-animation');
    setTimeout(() => {
      $ship[0].classList.remove('square-hit-animation');
    }, 600);
    $ship[0].classList.add('square-fire-animation');
  } else {
    sound.setSound('miss');
    $ship[0].classList.add('square-miss-animation');
    setTimeout(() => {
      $ship[0].classList.remove('square-miss-animation');
    }, 2000);
    $ship[0].classList.add('square-miss');
  }
}

function startGame() {
  onReadyBtn();
}

export { getMyShot, getEnemyShot, startGame };
