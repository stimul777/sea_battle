// обработка выстрела противником по квадрату
function shotProcessing(isCondition: boolean, sector: string) {
  console.log('sector', sector);
  const $myGrid: HTMLElement = document.querySelector('.my-grid') as HTMLElement;
  //@ts-ignore
  const $ship = $myGrid?.querySelectorAll('.' + sector);

  if (isCondition) {
    $ship[0].classList.add('square-hit-animation');
    setTimeout(() => {
      $ship[0].classList.remove('square-hit-animation');
    }, 600);
    $ship[0].classList.add('square-fire-animation');
  } else {
    $ship[0].classList.add('square-miss-animation');
    setTimeout(() => {
      $ship[0].classList.remove('square-miss-animation');
    }, 2000);
    $ship[0].classList.add('square-miss');
  }
}

export { shotProcessing };
