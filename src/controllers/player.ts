import { setShot, msgShot } from '@/models/socket';
import { shotProcessing } from '@/view/grid/events';
import { onConsole } from '@/helpers/console';
import { sound } from '@/view/sound';

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

  // выстрел по чужому кораблю
  shotAtShip(value: string) {
    this.myShots.push(value);
    onConsole('green', 'Выстрел по противнику:', value);
    setShot(value);
  }

  // Выстрел в меня
  shotAtMe(value: string) {
    console.log('value', value);
    console.log('this.myShips', this.myShips);
    const isCondition = this.myShips.includes(value);
    shotProcessing(isCondition, value);

    if (isCondition) {
      onConsole('green', 'В вас попали! Сектор:', value);
      sound('hit');
      this.deleteShip(value);
      if (this.myShips.length === 0) this.endGame();
    } else {
      sound('miss');
      onConsole('green', 'Противник промахнулся! Сектор:', value);
    }

    msgShot(isCondition);
  }

  // сообщение противнику об успехе\промахе
  msgToPlayer(hit: boolean) {
    hit ? onConsole('cyan', 'Вы попали!', '') : onConsole('cyan', 'Вы промахнулись!', '');
  }

  endGame() {
    alert(`Вы проиграли!`);
  }
}

const player = new Player();
export { player };
