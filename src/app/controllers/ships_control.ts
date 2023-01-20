// view
import { onPier } from '@/app/view/pier/pier_view';
import { getMyShot, getEnemyShot, startGame } from '@/app/view/grid/events_view';
import { toast } from '@/app/view/toast_view';
// controllers
import { player } from '@/app/controllers/player_control';

import { TShips, TShip, tShot, tConditionOfShip } from '@/types/ships';
import { onConsole } from '@/helpers/console';
import { setShot, msgShot } from '@/app/models/socket';
import { onRepacking } from '@/helpers/repacking';

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

  //*
  //* 🚢 Установка моих кораблей
  //*
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
      //* Battleship
      case this.ships > 16:
        this.shipsRang.battleship.coordinates.push(sector);
        break;
      case this.ships === 16:
        startGame();
        this.shipsRang.battleship.coordinates.push(sector);
        this.shipsRang.battleship.coordinates = onRepacking(this.shipsRang.battleship.coordinates, 0);
        return setCounter(this.shipsRang.battleship);
      //* Cruisers
      case this.ships === 15:
      case this.ships === 14:
      case this.ships === 12:
      case this.ships === 11:
        this.shipsRang.cruisers.coordinates.push(sector);
        break;
      case this.ships === 13:
        this.shipsRang.cruisers.coordinates.push(sector);
        return setCounter(this.shipsRang.cruisers);
      case this.ships === 10:
        this.shipsRang.cruisers.coordinates.push(sector);
        this.shipsRang.cruisers.coordinates = onRepacking(this.shipsRang.cruisers.coordinates, 3);
        return setCounter(this.shipsRang.cruisers);
      //* Destroyers
      case this.ships === 10:
      case this.ships === 9:
      case this.ships === 7:
      case this.ships === 5:
        this.shipsRang.destroyers.coordinates.push(sector);
        break;
      case this.ships === 8 || this.ships === 6:
        this.shipsRang.destroyers.coordinates.push(sector);
        return setCounter(this.shipsRang.destroyers);
      case this.ships === 4:
        this.shipsRang.destroyers.coordinates.push(sector);
        this.shipsRang.destroyers.coordinates = onRepacking(this.shipsRang.destroyers.coordinates, 2);
        return setCounter(this.shipsRang.destroyers);
      //* Boats
      case this.ships < 4 && this.ships > 0:
        this.shipsRang.boats.coordinates.push(sector);
        return setCounter(this.shipsRang.boats);
      case this.ships === 0:
        this.shipsRang.boats.coordinates.push(sector);
        this.shipsRang.boats.coordinates = onRepacking(this.shipsRang.boats.coordinates, 1);
        return setCounter(this.shipsRang.boats);
    }
  }

  // удаление моих кораблей
  deleteShip(value: string) {
    this.myShips.splice(this.myShips.indexOf(value), 1);
  }

  //*
  //* 🚢 выстрел по кораблю противника
  //*
  shotAtShip(value: string) {
    this.myShots.push(value);
    onConsole('green', 'Выстрел по противнику:', value);
    setShot(value);
  }

  //*
  //* 💥 выстрел в меня
  //*
  shotAtMe(sector: string) {
    // корабль в текущей сессии
    let conditionOfShip: tConditionOfShip = {
      injury: false, //ранен
      killed: false, //убит
      sunkenShip: [], // опиздюливаемый корабль, его нужно закрасить
    };

    let key: keyof typeof this.shipsRang;
    for (key in this.shipsRang) {
      // определение попадания по кораблю
      conditionOfShip.injury = this.shipsRang[key].coordinates
        .flatMap((shipSector: string) => shipSector)
        .includes(sector);

      if (conditionOfShip.injury) {
        this.shipsRang[key].injuriesCoordinates.push(sector);

        // проверка на убийство корабля
        this.shipsRang[key].coordinates.forEach((arrSector: any) => {
          let match = arrSector.flatMap((elem: string) => {
            let res = this.shipsRang[key].injuriesCoordinates.filter((m: string) => elem === m);
            return res.sort();
          });

          // все координаты ранения и самого коробля совпали - корабль убит
          if (arrSector.toString() === match.toString()) {
            conditionOfShip.sunkenShip = match;
            this.shipsRang[key].coordinates.splice(this.shipsRang[key].coordinates.indexOf(arrSector), 1);
            conditionOfShip.injury = false;
            conditionOfShip.killed = true;
          }
        });

        break;
      }
    }

    const hit = this.myShips.includes(sector);

    getMyShot({ hit, sector, conditionOfShip });
    msgShot({ hit, sector, conditionOfShip });

    if (hit) {
      onConsole('green', 'в вас попали! Сектор: ', sector);
      toast.onToast('red', 'в вас попали! Сектор: ' + sector, true);
      this.deleteShip(sector);
      if (this.myShips.length === 0) player.endGame();
    } else {
      onConsole('green', 'Противник промахнулся! Сектор: ', sector);
      toast.onToast('blue', 'Противник промахнулся! Сектор: ' + sector, true);
    }
  }

  //*
  //* ✉️ сообщение противнику об успехе\промахе
  //*
  msgToPlayer(value: tShot) {
    value.hit
      ? (onConsole('cyan', 'Вы попали! Сектор:', value.sector),
        toast.onToast('cyan', 'Вы попали! Сектор: ' + value.sector, true))
      : (onConsole('cyan', 'Вы промахнулись! Сектор: ', value.sector),
        toast.onToast('orange', 'Вы промахнулись! Сектор: ' + value.sector, true));
    getEnemyShot(value);
  }
}

const ships = new Ships();
export { ships };
