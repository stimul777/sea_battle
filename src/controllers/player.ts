import { setShot, msgShot } from '@/models/socket';
import { shotProcessing, shotProcessingEnemy } from '@/view/grid/events';
import { onConsole } from '@/helpers/console';

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

  setAbout() {
    //@ts-ignore
    const name = document.querySelector<HTMLDivElement>('.player-name-input');
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
  shotAtMe(value: string) {
    console.log('Выстрел в меня, сектор:', value);
    const isCondition = this.myShips.includes(value);
    shotProcessing(isCondition, value);

    if (isCondition) {
      onConsole('green', 'В вас попали! Сектор:', value);
      this.deleteShip(value);
      if (this.myShips.length === 0) this.endGame();
    } else {
      onConsole('green', 'Противник промахнулся! Сектор:', value);
    }

    msgShot(isCondition, value);
  }

  // сообщение противнику об успехе\промахе
  msgToPlayer(value: any) {
    console.log('hit', value.hit);
    console.log('hit-value', value.value);
    value.hit ? onConsole('cyan', 'Вы попали! Сектор:', value) : onConsole('cyan', 'Вы промахнулись! Сектор:', value);
    shotProcessingEnemy(value.hit, value.value);
  }

  endGame() {
    alert(`Вы проиграли!`);
  }
}

const player = new Player();
export { player };
