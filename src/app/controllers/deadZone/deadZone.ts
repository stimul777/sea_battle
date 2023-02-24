import { TDirectionShip } from '@/types/ships';
import { setSort } from '@/helpers/sort';
import setOnVerticalDirection from '@/app/controllers/deadZone/vertical';
import setOnHorizontalDirection from '@/app/controllers/deadZone/horizontal';

//*
//* "Мертвая" неактивная зона вокруг корабля
//*
export function setDeadZone(coordinates: any, activeSector: string, directionShip: TDirectionShip) {
  coordinates = setSort(coordinates);

  switch (directionShip) {
    case 'horizontal':
      setOnHorizontalDirection(coordinates, activeSector, directionShip);
      break;
    case 'vertical':
      setOnVerticalDirection(coordinates, activeSector, directionShip);
      break;
    case 'single':
      setOnHorizontalDirection(coordinates, activeSector, directionShip);
      setOnVerticalDirection(coordinates, activeSector, directionShip);
      break;
  }
}
