//*
//* Виджет аудио плеера
//*
export function onViewPlayer() {
  const $wrapper: HTMLElement = document.querySelector('.wrapper-settings') as HTMLElement;

  const container_sound: HTMLElement = document.createElement('div');
  const iconPlay: HTMLElement = document.createElement('div');
  const iconStop: HTMLElement = document.createElement('div');

  container_sound.classList.add('container-sound');

  iconPlay.classList.add('additions-icon_play');
  iconStop.classList.add('additions-icon_stop');

  iconPlay.classList.add('additions-icon_play');
  iconStop.classList.add('additions-icon_stop');

  const text = document.createElement('p');
  text.classList.add('additions-icon_text');
  text.textContent = 'sound on/off';

  container_sound.prepend(iconPlay, iconStop, text);

  $wrapper.prepend(container_sound);
}
