import { TShips, TShip } from '@/types/ships';
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
      battleship: {
        quantity: 1,
        installed: false,
        injuriesCoordinates: [],
        coordinates: [],
      },
      cruisers: {
        quantity: 2,
        installed: false,
        injuriesCoordinates: [],
        coordinates: [],
      },
      destroyers: {
        quantity: 3,
        installed: false,
        injuriesCoordinates: [],
        coordinates: [],
      },
      boats: {
        quantity: 4,
        installed: false,
        injuriesCoordinates: [],
        coordinates: [],
      },
    };
    this.myShips = [];
    this.myShots = [];
  }

  // Установка моих кораблей
  setShips(sector: string, action: 'add' | 'remove'): any {
    this.myShips.push(sector);

    const setCounter = (ship: TShip) => {
      ship.quantity -= 1;
      ship.installed = true;
      onPier(); //ререндер
      return ship;
    };

    switch (action) {
      case 'add':
        this.ships -= 1;
        break;
      case 'remove':
        this.ships += 1;
        break;
    }

    //это, конечно же, боль...
    switch (true) {
      // Battleship
      case this.ships > 16:
        this.shipsRang.battleship.coordinates.push(sector);
        break;
      case this.ships === 16:
        this.shipsRang.battleship.coordinates.push(sector);
        return setCounter(this.shipsRang.battleship);
      // Cruisers
      case this.ships === 13:
      case this.ships === 10:
        this.shipsRang.cruisers.coordinates.push(sector);
        return setCounter(this.shipsRang.cruisers);
      case this.ships < 16 && this.ships > 10:
        this.shipsRang.cruisers.coordinates.push(sector);
        break;
      // Destroyers
      case this.ships === 8:
      case this.ships === 6:
      case this.ships === 4:
        this.shipsRang.destroyers.coordinates.push(sector);
        return setCounter(this.shipsRang.destroyers);
      case this.ships < 10 && this.ships > 4:
        this.shipsRang.destroyers.coordinates.push(sector);
        break;
      // Boats
      case this.ships === 3:
      case this.ships === 2:
      case this.ships === 1:
      case this.ships === 0:
        this.shipsRang.boats.coordinates.push(sector);
        return setCounter(this.shipsRang.boats);
      case this.ships < 4 && this.ships > 0:
        this.shipsRang.destroyers.coordinates.push(sector);
        break;
    }
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

    let conditionOfShip = {
      injury: false, //ранен
      killed: false, //убит
      sunkenShip: [], // опиздюливаемый корабль
    };

    for (let key in this.shipsRang) {
      //@ts-ignore
      conditionOfShip.injury = this.shipsRang[key].coordinates.includes(sector);
      if (conditionOfShip.injury) {
        //@ts-ignore
        this.shipsRang[key].injuriesCoordinates.push(sector);
        //@ts-ignore
        conditionOfShip.sunkenShip = this.shipsRang[key].injuriesCoordinates;
        if (
          //@ts-ignore
          this.shipsRang[key].injuriesCoordinates.length === this.shipsRang[key].coordinates.length
        ) {
          conditionOfShip.injury = false;
          conditionOfShip.killed = true;
        }
        break;
      }
    }

    getMyShot({ hit, sector, conditionOfShip });
    msgShot({ hit, sector, conditionOfShip });

    if (hit) {
      onConsole('green', 'В вас попали! Сектор:', sector);
      this.deleteShip(sector);
      if (this.myShips.length === 0) player.endGame();
    } else {
      onConsole('green', 'Противник промахнулся! Сектор:', sector);
    }
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
