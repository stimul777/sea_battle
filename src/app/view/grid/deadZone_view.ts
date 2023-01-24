import { onValidations } from '@/app/view/grid/validationOfShips_view';

//*
//* "Мертвая" неактивная зона вокруг корабля
//*
export function getDeadZone(coordinates: Array<string>, activeSector: string, directionShip: string) {
  console.log('dead zone', coordinates, activeSector, directionShip);

  coordinates.forEach((sector) => {
    let $sector = document.querySelector('.' + sector);

    let newSectorPlus = null;
    let newSectorMinus = null;

    if (directionShip === 'horizontal') {
      let sectorNumber = sector.substring(2, 1);
      let sectorLetter = sector.substring(0, 1);
      newSectorPlus = sectorLetter + (Number(sectorNumber) + 1);
      newSectorMinus = sectorLetter + (Number(sectorNumber) - 1);
    }
    //! сюда передавать onValidations sector + 1 и sector и его соседей, если валидация вернет тру то красить фолс то красить сектор

    const $newSectorPlus = document.querySelector('.' + newSectorPlus);
    const $newSectorMinus = document.querySelector('.' + newSectorMinus);

    console.log('$newSectorMinus', $newSectorMinus);

    onValidations(newSectorPlus, activeSector, directionShip) ? null : $newSectorPlus?.classList.add('safeZone');
    onValidations(newSectorMinus, activeSector, directionShip) ? null : $newSectorMinus?.classList.add('safeZone');
  });
}
