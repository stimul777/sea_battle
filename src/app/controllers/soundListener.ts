export function soundListener() {
  const $play: HTMLBaseElement = document.querySelector('.additions-icon_play') as HTMLBaseElement;
  const $stop: HTMLBaseElement = document.querySelector('.additions-icon_stop') as HTMLBaseElement;

  console.log('start!', $play);

  const onPlay = () => {
    $play?.addEventListener('click', (event: Event) => {
      console.log('click', event);
      $play.style.display = 'none';
      $stop.style.display = 'block';
    });
  };

  const onStop = () => {
    $stop?.addEventListener('click', () => {
      $play.style.display = 'block';
      $stop.style.display = 'none';
    });
  };

  onPlay();
  onStop();
}
