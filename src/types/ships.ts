export type TShips = {
  battleship: TShip;
  cruisers: TShip;
  destroyers: TShip;
  boats: TShip;
};

export type TShip = {
  quantity: number;
  installed: boolean;
  used: number;
  coordinates: string[];
};

export type tShot = {
  hit: boolean;
  sector: string;
};
