import { TShips } from '@/types/ships';

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

    // а тут надо какую-т реактивность с хтмл
    if (this.ships === 16) {
      console.log('222');
      this.shipsRang.battleship = 0;
    }
  }
}

const ships = new Ships();
export { ships };
