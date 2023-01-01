import { onConsole } from '@/helpers/console';

class Player {
  victories: number;
  defeats: number;

  constructor() {
    this.victories = 0;
    this.defeats = 0;
  }

  endGame() {
    this.defeats += 1;
    onConsole('red', 'ВЫ ПРОИГРАЛИ! КОЛИЧЕСТВО ПОРАЖЕНИЙ:', this.defeats);
  }
}

const player = new Player();
export { player };
