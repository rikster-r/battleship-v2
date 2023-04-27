// used for drag and drop
export const isPositionValid = (
  startPosition: number,
  shipLength: number,
  axis: string
) => {
  // Check if the starting position is out of bounds
  if (startPosition < 0 || startPosition > 99) {
    return false;
  }

  // Check if the ship would go out of bounds horizontally
  if (axis === "x" && (startPosition % 10) + shipLength > 10) {
    return false;
  }

  // Check if the ship would go out of bounds vertically
  if (axis === "y" && startPosition + (shipLength - 1) * 10 > 99) {
    return false;
  }

  // Otherwise, the position is valid
  return true;
};
