import { useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragOverEvent,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { AnimatePresence } from "framer-motion";
import { isPositionValid } from "../utils/validators";
import {
  createField,
  createShips,
  createShipPositions,
} from "../utils/creators";
import { getRandomNumber, getRandomAxis } from "../utils/random";
import DraggableShip from "./DraggableShip";
import DroppableCell from "./DroppableCell";
import FieldShip from "./FieldShip";
import FieldWrapper from "./FieldWrapper";

type Props = {
  playerShips: Ships;
  setPlayerField: React.Dispatch<React.SetStateAction<Field>>;
  playerField: Field;
  setPlayerShips: React.Dispatch<React.SetStateAction<Ships>>;
  setComputerField: React.Dispatch<React.SetStateAction<Field>>;
  setComputerShips: React.Dispatch<React.SetStateAction<Ships>>;
  setGameStatus: React.Dispatch<
    React.SetStateAction<"setup" | "inProgress" | "playerWon" | "computerWon">
  >;
};

const Setup = ({
  playerShips,
  setPlayerShips,
  playerField,
  setPlayerField,
  setComputerField,
  setComputerShips,
  setGameStatus,
}: Props) => {
  const [axis, setAxis] = useState<"x" | "y">("x");
  // all cells are droppables and all the ships are draggables
  const [hoveredCellId, setHoveredCellId] = useState<number>();
  const [draggedShipId, setDraggedShipId] = useState<number>();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = () => {
    if (hoveredCellId === undefined || !draggedShipId) return;

    const shipLength = playerShips[draggedShipId].length;

    if (isPositionValid(playerField, hoveredCellId, shipLength, axis)) {
      //get dropped ships positions
      const positions = createShipPositions(hoveredCellId, shipLength, axis);

      // set dropped ships new positions
      setPlayerShips((ships) => ({
        ...ships,
        [draggedShipId]: {
          ...ships[draggedShipId],
          positions,
          axis,
        },
      }));

      // set ids in cells
      const fieldClone = playerField.slice(0);

      positions.forEach(
        (id) =>
          (fieldClone[id] = {
            ...fieldClone[id],
            shipId: draggedShipId,
          })
      );

      setPlayerField(fieldClone);
    }

    resetDnDState();
  };

  const handleDragOver = (event: DragOverEvent) => {
    setHoveredCellId(event.collisions?.at(0)?.id as number);
    setDraggedShipId(event.active.id as number);
  };

  const resetDnDState = () => {
    setHoveredCellId(undefined);
    setDraggedShipId(undefined);
  };

  const resetShipPosition = (id: number) => {
    setPlayerShips((ships) => ({
      ...ships,
      [id]: {
        ...ships[id],
        positions: [],
      },
    }));
  };

  const resetCell = (id: number) => {
    setPlayerField(
      playerField.map((cell) => {
        return cell.shipId === id
          ? {
              ...cell,
              shipId: undefined,
            }
          : cell;
      })
    );
  };

  const resetShipPlacement = (id: number) => {
    resetShipPosition(id);
    resetCell(id);
  };

  const resetAll = () => {
    Object.keys(playerShips).forEach((id) => resetShipPosition(Number(id)));
    setPlayerField(createField());
  };

  const placeShipsRandomly = (player: "computer" | "person") => {
    if (player === "person") resetAll();

    const newShips = createShips();
    const newField = createField();

    for (let i = 1; i < 11; i++) {
      let newPosition: number;
      let newAxis: "x" | "y";

      do {
        newPosition = getRandomNumber(0, 99);
        newAxis = getRandomAxis();
      } while (
        !isPositionValid(newField, newPosition, newShips[i].length, newAxis)
      );

      newShips[i].positions = createShipPositions(
        newPosition,
        newShips[i].length,
        newAxis
      );
      newShips[i].axis = newAxis;
      newShips[i].positions.forEach(
        (id) =>
          (newField[id] = {
            ...newField.at(id),
            shipId: i,
          } as Cell)
      );
    }

    if (player === "computer") {
      setComputerField(newField);
      setComputerShips(newShips);
    } else {
      setPlayerShips(newShips);
      setPlayerField(newField);
    }
  };

  const handleSubmit = () => {
    // check if every ship is placed
    if (Object.values(playerShips).some((ship) => ship.positions.length === 0))
      return;

    placeShipsRandomly("computer");
    setGameStatus("inProgress");
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={resetDnDState}
      modifiers={[restrictToWindowEdges]}
      sensors={sensors}
    >
      <div className="flex flex-col gap-3">
        <div className="flex w-full max-w-max flex-col justify-center gap-8 rounded-md bg-neutral-900 bg-opacity-90 p-4 text-neutral-100 md:p-7 lg:flex-row">
          <div className="flex h-full flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-4">
              <button
                className={`${
                  axis === "x" ? "bg-neutral-100 text-neutral-900" : ""
                } inline-block rounded-md border border-neutral-100 px-8 py-2.5 text-xs font-medium transition hover:scale-105 sm:text-base md:px-12`}
                onClick={() => setAxis("x")}
              >
                X axis
              </button>
              <button
                className={`${
                  axis === "y" ? "bg-neutral-100 text-neutral-900" : ""
                } inline-block rounded-md border border-neutral-100 px-8 py-2.5 text-xs font-medium transition hover:scale-105 sm:text-base md:px-12`}
                onClick={() => setAxis("y")}
              >
                Y axis
              </button>
            </div>
            <FieldWrapper>
              <div className="relative grid aspect-square grid-cols-[repeat(10,minmax(0,56px))] border border-neutral-400">
                {playerField.map((data, id) => (
                  <DroppableCell
                    field={playerField}
                    data={data}
                    key={id}
                    cellId={id}
                    hoveredCellId={hoveredCellId}
                    draggedShipId={draggedShipId}
                    axis={axis}
                    ships={playerShips}
                  />
                ))}
                {Object.entries(playerShips).map(([id, ship]) => (
                  <FieldShip key={id} ship={ship} />
                ))}
              </div>
            </FieldWrapper>
          </div>
          <div className="flex flex-wrap justify-center gap-1 lg:grid lg:grid-cols-2">
            <AnimatePresence initial={false}>
              {Object.entries(playerShips).map(([id, ship]) => (
                // 1 - 10
                <DraggableShip
                  key={id}
                  id={Number(id)}
                  ships={playerShips}
                  ship={ship}
                  resetShipPlacement={resetShipPlacement}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex w-full justify-center gap-4 rounded-md bg-neutral-900 bg-opacity-90 py-5 text-neutral-100">
          <button
            className="inline-block rounded-md border border-neutral-100 px-6 py-2.5 text-xs font-medium transition hover:scale-105 active:bg-neutral-100 active:text-neutral-900 sm:px-12 sm:text-base"
            onClick={resetAll}
          >
            Reset
          </button>
          <button
            className="inline-block rounded-md border border-neutral-100 px-6 py-2.5 text-xs font-medium transition hover:scale-105 active:bg-neutral-100 active:text-neutral-900 sm:px-12 sm:text-base"
            onClick={() => placeShipsRandomly("person")}
          >
            Random
          </button>
          <button
            className={`${
              Object.values(playerShips).some(
                (ship) => ship.positions.length === 0
              )
                ? "hover:cursor-not-allowed"
                : "transition hover:scale-105 active:bg-neutral-100 active:text-neutral-900"
            } inline-block rounded-md border border-neutral-100 px-6 py-2.5 text-xs font-medium sm:px-12 sm:text-base`}
            disabled={Object.values(playerShips).some(
              (ship) => ship.positions.length === 0
            )}
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </DndContext>
  );
};

export default Setup;
