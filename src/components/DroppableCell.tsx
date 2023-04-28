import { useDroppable } from "@dnd-kit/core";
import { isPositionValid } from "../utils/validators";

type Props = {
  field: Field;
  cellId: number;
  data: Cell;
  draggedShipId?: number;
  hoveredCellId?: number;
  axis: string;
  ships: Ships;
};

const DroppableCell = ({
  field,
  cellId,
  draggedShipId,
  hoveredCellId,
  axis,
  ships,
}: Props) => {
  const { setNodeRef } = useDroppable({ id: cellId });

  const getCellStatus = () => {
    // speficially checks for undefined because id can be 0
    if (hoveredCellId === undefined || !draggedShipId) return;

    const shipLength = ships[draggedShipId].length;

    let isPartOfShip = false;

    for (let i = 0; i < shipLength; i++) {
      if (
        (axis === "x" && cellId === hoveredCellId + i) ||
        (axis === "y" && cellId === hoveredCellId + i * 10)
      ) {
        isPartOfShip = true;
        break;
      }
    }

    if (isPartOfShip && isPositionValid(field, hoveredCellId, shipLength, axis))
      return "valid";

    if (isPartOfShip) return "error";
  };

  const status = getCellStatus();

  return (
    <div
      className={`${status === "valid" ? "bg-cyan-800" : ""}
      ${
        status === "error" ? "bg-red-800" : ""
      } relative flex aspect-square items-center justify-center border border-neutral-400`}
      ref={setNodeRef}
    ></div>
  );
};

export default DroppableCell;
