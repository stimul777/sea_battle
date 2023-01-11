import { onConsole } from '@/helpers/console';
import { toast } from '@/app/view/toast_view';

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
    toast.onToast('red', 'ВЫ ПРОИГРАЛИ! КОЛИЧЕСТВО ПОРАЖЕНИЙ: ' + this.defeats, false);
  }
}

const player = new Player();
export { player };
