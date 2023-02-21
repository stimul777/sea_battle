import { startGame } from '@/app/controllers/events';
import { player } from '@/app/models/Player';

import { TShips, TShip, tShot, tConditionOfShip } from '@/types/ships';
import { onConsole } from '@/helpers/console';
import { setShot, msgShot } from '@/app/models/socket';

import { handlerToToast, handlerToPier, handlerToShots } from '@/app/controllers/state';

class Ships {
  shipsCounter: number;
  shipsRang: TShips;
  myShots: string[];

  constructor() {
    this.shipsCounter = 20; // кол-во доступных клеток для всех кораблей
    this.shipsRang = {
      battleship: {
        quantity: 1,
        installed: false,
        inProgress: [],
        injuriesCoordinates: [],
        coordinates: [],
      },
      cruisers: {
        quantity: 2,
        installed: false,
        inProgress: [],
        injuriesCoordinates: [],
        coordinates: [],
      },
      destroyers: {
        quantity: 3,
        installed: false,
        inProgress: [],
        injuriesCoordinates: [],
        coordinates: [],
      },
      boats: {
        quantity: 4,
        installed: false,
        inProgress: [],
        injuriesCoordinates: [],
        coordinates: [],
      },
    };
    this.myShots = [];
  }

  //*
  //* 🚢 Установка моих кораблей
  //*
  setShips(sector: string): any {
    this.shipsCounter -= 1;
    // this.myShips.push(sector);

    const setCounter = (ship: TShip) => {
      ship.quantity -= 1;
      ship.installed = true;
      handlerToPier(this.shipsRang);
      return ship;
    };

    //это, конечно же, боль...
    switch (true) {
      //* Battleship
      case this.shipsCounter > 16:
        this.shipsRang.battleship.inProgress.push(sector);
        break;
      case this.shipsCounter === 16:
        startGame();
        this.shipsRang.battleship.inProgress.push(sector);
        this.shipsRang.battleship.coordinates.push(this.shipsRang.battleship.inProgress);
        this.shipsRang.battleship.inProgress = [];
        handlerToToast('red', 'Battleship готов к бою!', true);
        return setCounter(this.shipsRang.battleship);
      //* Cruisers
      case this.shipsCounter === 15:
      case this.shipsCounter === 14:
      case this.shipsCounter === 12:
      case this.shipsCounter === 11:
        this.shipsRang.cruisers.inProgress.push(sector);
        break;
      case this.shipsCounter === 13:
      case this.shipsCounter === 10:
        this.shipsRang.cruisers.inProgress.push(sector);
        this.shipsRang.cruisers.coordinates.push(this.shipsRang.cruisers.inProgress);
        this.shipsRang.cruisers.inProgress = [];
        handlerToToast('red', 'Cruisers готов к бою!', true);
        return setCounter(this.shipsRang.cruisers);
      //* Destroyers
      case this.shipsCounter === 10:
      case this.shipsCounter === 9:
      case this.shipsCounter === 7:
      case this.shipsCounter === 5:
        this.shipsRang.destroyers.inProgress.push(sector);
        break;
      case this.shipsCounter === 8 || this.shipsCounter === 6 || this.shipsCounter === 4:
        this.shipsRang.destroyers.inProgress.push(sector);
        this.shipsRang.destroyers.coordinates.push(this.shipsRang.destroyers.inProgress);
        this.shipsRang.destroyers.inProgress = [];
        handlerToToast('red', 'Destroyer готов к бою!', true);
        return setCounter(this.shipsRang.destroyers);
      //* Boats
      case this.shipsCounter < 4 && this.shipsCounter >= 0:
        this.shipsRang.boats.inProgress.push(sector);
        this.shipsRang.boats.coordinates.push(this.shipsRang.boats.inProgress);
        this.shipsRang.boats.inProgress = [];
        handlerToToast('red', 'Boat готов к бою!', true);
        return setCounter(this.shipsRang.boats);
    }
  }

  // удаление моих кораблей
  deleteShip(value: string) {
    this.shipsCounter += 1;

    //! Если корабль не установлен, он еще не разбит на чанки
    let key: keyof typeof this.shipsRang;
    for (key in this.shipsRang) {
      //@ts-ignore
      if (this.shipsRang[key].coordinates.includes(value)) {
        //@ts-ignore
        this.shipsRang[key].coordinates.splice(this.shipsRang[key].coordinates.indexOf(value), 1);
        break;
      }
    }
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
    let hit: boolean = false;
    for (key in this.shipsRang) {
      // определение попадания по кораблю
      conditionOfShip.injury = this.shipsRang[key].coordinates.flatMap((shipSector) => shipSector).includes(sector);

      if (conditionOfShip.injury) {
        this.shipsRang[key].injuriesCoordinates.push(sector);
        hit = true;

        // проверка на убийство корабля
        this.shipsRang[key].coordinates.forEach((arrSector: any) => {
          let match = arrSector.flatMap((elem: string) => {
            let res = this.shipsRang[key].injuriesCoordinates.filter((m: string) => elem === m);
            return res.sort();
          });

          // все координаты ранения и самого корабля совпали - корабль убит
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

    handlerToShots({ hit, sector, conditionOfShip }, 'my attack');
    msgShot({ hit, sector, conditionOfShip });

    if (hit) {
      onConsole('green', 'в вас попали! Сектор: ', sector);
      handlerToToast('red', 'в вас попали! Сектор: ' + sector, true);

      //! скорее всего удаляем уже удаленное выше
      this.deleteShip(sector);

      let isFinishGame = false;
      for (key in this.shipsRang) {
        if (this.shipsRang[key].coordinates.length) {
          isFinishGame = false;
          break;
        } else {
          isFinishGame = true;
        }
      }

      if (isFinishGame) player.endGame('loss');
    } else {
      onConsole('green', 'Противник промахнулся! Сектор: ', sector);
      handlerToToast('cyan', 'Противник промахнулся! Сектор: ' + sector, true);
    }
  }

  //*
  //* ✉️ сообщение противнику об успехе\промахе
  //*
  msgToPlayer(value: tShot) {
    value.hit
      ? (onConsole('cyan', 'Вы попали! Сектор:', value.sector),
        handlerToToast('cyan', 'Вы попали! Сектор: ' + value.sector, true))
      : (onConsole('cyan', 'Вы промахнулись! Сектор: ', value.sector),
        handlerToToast('orange', 'Вы промахнулись! Сектор: ' + value.sector, true));
    handlerToShots(value, 'enemy attack');
  }
}

const ships = new Ships();
export { ships };
