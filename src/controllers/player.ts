export class Player {
  victories: number;
  locationOfVessels: never[];
  myShips: string[];

  constructor() {
    this.victories = 0;
    this.locationOfVessels = [];
    this.myShips = [];
  }

  setAbout() {
    //@ts-ignore
    const name = document.querySelector<HTMLDivElement>('.player-name-input');
  }

  setShips(value: string) {
    this.myShips.push(value);
    console.log('myShips', this.myShips);
  }

  sendShot(value: string) {
    console.log();
  }
}
