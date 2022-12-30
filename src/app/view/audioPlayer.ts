// Виджет аудиоплеера
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
