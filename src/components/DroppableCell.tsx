import { type ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { isPositionValid } from "../utils/validators";

type Props = {
  children?: ReactNode | ReactNode[];
  id: number;
  currentShipId?: number;
  currentCellId?: number;
  axis: string;
  ships: Ships;
};

const DroppableCell = ({
  children,
  id,
  currentCellId,
  currentShipId,
  axis,
  ships,
}: Props) => {
  const { setNodeRef } = useDroppable({ id });

  const getCellStatus = () => {
    // speficially checks for undefined because id can be 0
    if (currentCellId === undefined || !currentShipId) return;

    const shipLength = ships[currentShipId].length;

    let isPartOfShip = false;

    for (let i = 0; i < shipLength; i++) {
      if (
        (axis === "x" && id === currentCellId + i) ||
        (axis === "y" && id === currentCellId + i * 10)
      ) {
        isPartOfShip = true;
        break;
      }
    }

    if (isPartOfShip && isPositionValid(currentCellId, shipLength, axis))
      return "valid";

    if (isPartOfShip) return "error";
  };

  const status = getCellStatus();

  return (
    <div
      className={`${status === "valid" ? "bg-cyan-800" : ""}
      ${
        status === "error" ? "bg-red-800" : ""
      } flex aspect-square items-center justify-center border border-neutral-400`}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export default DroppableCell;
