import { Player } from '@/controllers/player';
const player = new Player();
//Слушатель событий с сетки
export function GridListener() {
  const $square = document.querySelector('.wrapper-grid');

  const onListener = () => {
    $square?.addEventListener('click', (event) => {
      event.stopPropagation();
      if (event.target.classList[0] === 'active') {
        event.srcElement.classList.remove('active');
        console.log('remove', elem);
        return;
      }
      //@ts-ignore
      const elem = event.target.classList[0];
      //@ts-ignore
      event.srcElement.classList.add('active');
      console.log('elem', elem);
      player.setShips(elem);
    });
  };

  onListener();
}

GridListener();
