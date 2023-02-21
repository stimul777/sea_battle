import { sound } from '@/app/models/Sound';

//*
//* Слушатель событий кнопки
//*
export function soundListener() {
  const $play: HTMLBaseElement = document.querySelector('.additions-icon_play') as HTMLBaseElement;
  const $stop: HTMLBaseElement = document.querySelector('.additions-icon_stop') as HTMLBaseElement;

  const onPlay = () => {
    $play?.addEventListener('click', () => {
      $play.style.display = 'none';
      $stop.style.display = 'block';
      sound.onSound(true);
    });
  };

  const onStop = () => {
    $stop?.addEventListener('click', () => {
      $play.style.display = 'block';
      $stop.style.display = 'none';
      sound.onSound(false);
    });
  };

  onPlay();
  onStop();
}
