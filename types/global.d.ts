type Cell = {
  shipId?: number;
  isHit: boolean;
};

type Field = Cell[];

type Ship = {
  positions: number[][];
  length: number;
  isDestroyed: boolean;
  image: string;
  name: string;
};

type Ships = Record<number, Ship>;
