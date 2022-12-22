import { setShot } from '@/models/socket';
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
    setShot(value);
  }

  // Выстрел в меня
  shotAtMe(value: string) {
    console.log('value', value);
    console.log('this.myShips', this.myShips);
    this.myShips.includes(value) ? alert('Попадание!') : alert('!Промах!');
    console.log('this.myShips', this.myShips.includes(value));
  }
}

const player = new Player();
export { player };
