// view
import { toast } from '@/app/view/toast_view';
import { onPier } from '@/app/view/pier/pier';
import { getMyShot, getEnemyShot } from '@/app/controllers/events';
import { tShot } from '@/types/ships';
// models
import { grid } from '@/app/models/Grid';

import { TShips } from '@/types/ships';

const state: any = {
  letters: grid.letters,
};

export function handlerToShots(state: tShot, type: 'my attack' | 'enemy attack') {
  switch (type) {
    case 'my attack':
      getMyShot(state);
      break;
    case 'enemy attack':
      getEnemyShot(state);
      break;
  }
}

export function handlerToToast(color: string, value: string, remove: boolean) {
  toast.onToast(color, value, remove);
}

export const handlerToPier = (ships: TShips) => onPier(ships);

export default state;
