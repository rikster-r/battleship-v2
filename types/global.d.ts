type Cell = {
  shipId?: number;
  isHit: boolean;
};

type Field = Cell[];

type Ship = {
  positions: number[];
  length: number;
  isDestroyed: boolean;
  image: string;
  name: string;
  axis?: "x" | "y";
};

type Ships = Record<number, Ship>;
