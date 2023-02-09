import { onConsole } from '@/helpers/console';
import handlerToToast from '@/app/controllers/state';
import { TStatus } from '@/types/player';
import { onFinish } from '@/app/models/socket';

class Player {
  victories: number;
  defeats: number;

  constructor() {
    this.victories = 0;
    this.defeats = 0;
  }

  endGame(value: TStatus) {
    switch (value) {
      case 'loss':
        this.defeats += 1;
        onConsole('red', 'ВЫ ПРОИГРАЛИ! КОЛИЧЕСТВО ПОРАЖЕНИЙ:', this.defeats);
        handlerToToast('red', 'ВЫ ПРОИГРАЛИ! КОЛИЧЕСТВО ПОРАЖЕНИЙ: ' + this.defeats, false);
        onFinish('win');
        break;
      case 'win':
        this.victories += 1;
        onConsole('yellow', 'ВЫ ПОБЕДИЛИ! КОЛИЧЕСТВО ПОБЕД:', this.victories);
        handlerToToast('yellow', 'ВЫ ПОБЕДИЛИ! КОЛИЧЕСТВО ПОБЕД: ' + this.victories, false);
        break;
    }
  }
}

const player = new Player();
export { player };
