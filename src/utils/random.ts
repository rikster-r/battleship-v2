export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomAxis = (): "x" | "y" => {
  return Math.random() > 0.5 ? "x" : "y";
};

export const getRandomUnhitCell = (field: Field) => {
  let position: number;

  do {
    position = getRandomNumber(0, 99);
  } while (field[position].isHit);

  return position;
};
