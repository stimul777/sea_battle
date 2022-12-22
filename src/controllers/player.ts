export class Player {
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

  setShips(value: string) {
    this.myShips.push(value);
  }

  deleteShip(value: string) {
    this.myShips.splice(this.myShips.indexOf(value), 1);
  }

  shotAtShip(value: string) {
    this.myShots.push(value);
  }

  sendShot(value: string) {
    console.log(value);
  }
}
