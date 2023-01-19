import { sound } from '@/app/controllers/sound_control';

//*
//* Виджет аудио плеера
//*
export function onViewPlayer() {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-audio_player') as HTMLElement;

  const iconPlay = document.createElement('div');
  const iconStop = document.createElement('div');

  iconPlay.classList.add('additions-icon_play');
  iconStop.classList.add('additions-icon_stop');

  iconPlay.classList.add('additions-icon_play');
  iconStop.classList.add('additions-icon_stop');

  const text = document.createElement('p');
  text.classList.add('additions-icon_text');
  text.textContent = 'sound on/off';

  $wrapper.prepend(iconPlay, iconStop, text);
}

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
