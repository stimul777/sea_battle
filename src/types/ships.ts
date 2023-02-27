export type TShips = {
  battleship: TShip;
  cruisers: TShip;
  destroyers: TShip;
  boats: TShip;
};

export type TShip = {
  name: string;
  quantity: number;
  installed: boolean;
  inProgress: string[];
  injuriesCoordinates: string[];
  coordinates: string[][];
};

export type tShot = {
  sector: string;
  hit: boolean;
  conditionOfShip: {
    injury: boolean;
    killed: boolean;
    sunkenShip: string[];
  };
};

export type tConditionOfShip = {
  injury: boolean; //ранен
  killed: boolean; //убит
  sunkenShip: string[];
};

export type TDirectionShip = 'vertical' | 'horizontal' | 'single' | '';
