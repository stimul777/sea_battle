import { TShips } from '@/types/ships';
import { onPier } from '@/app/view/pier/pier_view';
import { getMyShot, getEnemyShot } from '@/app/view/grid/events_view';
import { onConsole } from '@/helpers/console';
import { tShot } from '@/types/ships';
import { setShot, msgShot } from '@/app/models/socket';
import { player } from '@/app/controllers/player_control';

class Ships {
  ships: number;
  shipsRang: TShips;
  myShips: string[];
  myShots: string[];

  constructor() {
    this.ships = 20; // кол-во доступных клеток для всех кораблей
    this.shipsRang = {
      battleship: 1,
      cruisers: 2,
      destroyers: 3,
      boats: 4,
    };
    this.myShips = [];
    this.myShots = [];
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

    let rerender = false;
    switch (this.ships) {
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

  // установка моих кораблей
  setShips(value: string) {
    this.myShips.push(value);
  }

  // удаление моих кораблей
  deleteShip(value: string) {
    this.myShips.splice(this.myShips.indexOf(value), 1);
  }

  // выстрел по кораблю противника 🚢
  shotAtShip(value: string) {
    this.myShots.push(value);
    onConsole('green', 'Выстрел по противнику:', value);
    setShot(value);
  }

  // Выстрел в меня
  shotAtMe(sector: string) {
    const hit = this.myShips.includes(sector);
    getMyShot({ hit, sector });

    if (hit) {
      onConsole('green', 'В вас попали! Сектор:', sector);
      this.deleteShip(sector);
      if (this.myShips.length === 0) player.endGame();
    } else {
      onConsole('green', 'Противник промахнулся! Сектор:', sector);
    }

    msgShot({ hit, sector });
  }

  // сообщение противнику об успехе\промахе
  msgToPlayer(value: tShot) {
    value.hit
      ? onConsole('cyan', 'Вы попали! Сектор:', value.sector)
      : onConsole('cyan', 'Вы промахнулись! Сектор:', value.sector);
    getEnemyShot(value);
  }
}

const ships = new Ships();
export { ships };
