export type TShips = {
  battleship: TShip;
  cruisers: TShip;
  destroyers: TShip;
  boats: TShip;
};

export type TShip = {
  quantity: number;
  installed: boolean;
  injuriesCoordinates: string[];
  coordinates: string[];
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
