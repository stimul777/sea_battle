import { TShips } from '@/types/ships';
import { onPier } from '@/view/pier/pier';

class Ships {
  ships: number;
  shipsRang: TShips;

  constructor() {
    this.ships = 20; //кол-во клеток для всех кораблей
    this.shipsRang = {
      battleship: 1,
      cruisers: 2,
      destroyers: 3,
      boats: 4,
    };
  }

  setShip(value: 'add' | 'remove') {
    switch (value) {
      case 'add':
        this.ships -= 1;
        break;
      case 'remove':
        this.ships += 1;
        break;
    }

    console.log('this.ships', this.ships);

    let rerender = false;
    switch (this.ships) {
      // case this.ships > 16:
      //   this.shipsRang.battleship = 1;
      //   rerender = true;
      //   break;
      case 16:
        this.shipsRang.battleship -= 1;
        rerender = true;
        break;
      case 13:
      case 10:
        this.shipsRang.cruisers -= 1;
        rerender = true;
        break;
      case 8:
      case 6:
      case 4:
        this.shipsRang.destroyers -= 1;
        rerender = true;
        break;
      case 3:
      case 2:
      case 1:
      case 0:
        this.shipsRang.boats -= 1;
        rerender = true;
        break;
      default:
    }

    if (rerender) onPier(); //ререндер
  }
}

const ships = new Ships();
export { ships };
