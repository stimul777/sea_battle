import { setShot, msgShot } from '@/app/models/socket';
import { getMyShot, getEnemyShot } from '@/app/view/grid/events';
import { onConsole } from '@/helpers/console';
import { tShot } from '@/types/ships';

class Player {
  victories: number;
  locationOfVessels: never[];
  myShips: string[];
  myShots: string[];

  constructor() {
    this.victories = 0;
    this.locationOfVessels = [];
    this.myShips = [];
    this.myShots = [];
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
      if (this.myShips.length === 0) this.endGame();
    } else {
      onConsole('green', 'Противник промахнулся! Сектор:', sector);
    }

    msgShot({ hit, sector });
  }

  // сообщение противнику об успехе\промахе
  msgToPlayer(value: tShot) {
    console.log('hit', value.hit);
    console.log('hit-value', value.sector);
    value.hit
      ? onConsole('cyan', 'Вы попали! Сектор:', value.sector)
      : onConsole('cyan', 'Вы промахнулись! Сектор:', value.sector);
    getEnemyShot(value);
  }

  endGame() {
    alert(`Вы проиграли!`);
  }
}

const player = new Player();
export { player };
