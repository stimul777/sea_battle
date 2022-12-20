import { onSocket } from '@/models/socket';
//Слушатель событий с сетки
export function GridListener() {
  // const $btn = document.querySelector('.player-name-btn');
  // const $input = document.querySelector('.player-name-input');
  const $square = document.querySelector('.wrapper-grid');
  // onGrid();
  const onListener = () => {
    $square?.addEventListener('click', (event) => {
      event.stopPropagation();
      //@ts-ignore
      const elem = event.target.classList[0];
      //@ts-ignore
      // if (player.locationOfVessels.includes(elem)) return;
      //@ts-ignore
      event.srcElement.classList.add('active');
      // player.setLocation(elem);
      console.log(elem);
      onSocket(elem);
    });
  };
  onListener();
}
GridListener();
