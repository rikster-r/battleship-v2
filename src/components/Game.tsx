import Field from "./Field";
import { useState, useEffect } from "react";
import { isPositionOutOfBounds } from "../utils/validators";
import { createShipPositions } from "../utils/creators";
import { getRandomNumber } from "../utils/random";

type Props = {
  playerField: Field;
  setPlayerField: React.Dispatch<React.SetStateAction<Field>>;
  computerField: Field;
  setComputerField: React.Dispatch<React.SetStateAction<Field>>;
  playerShips: Ships;
  setPlayerShips: React.Dispatch<React.SetStateAction<Ships>>;
  computerShips: Ships;
  setComputerShips: React.Dispatch<React.SetStateAction<Ships>>;
  setGameStatus: React.Dispatch<
    React.SetStateAction<"setup" | "inProgress" | "playerWon" | "computerWon">
  >;
};

const Game = ({
  playerField,
  setPlayerField,
  computerField,
  setComputerField,
  playerShips,
  setPlayerShips,
  computerShips,
  setComputerShips,
  setGameStatus,
}: Props) => {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [computerHits, setComputerHits] = useState<number[]>([]);
  // hunt when searching for a ship, target when destroying one
  const [computerMode, setComputerMode] = useState<"hunt" | "target">("hunt");

  // stack of coordinates for computer to hit after finding a ship
  const [targetsStack, setTargetsStack] = useState<number[]>([]);

  const attackPlayer = (playerToAttack: string, position: number) => {
    // hit cell
    const fieldCopy: Field = JSON.parse(
      JSON.stringify(
        playerToAttack === "computer" ? computerField : playerField
      )
    );
    const cell = fieldCopy[position];
    // todo: fix issue with target logic
    if (cell === undefined) {
      setIsPlayerTurn((value) => !value);
      return;
    }

    cell.isHit = true;

    // update field
    if (playerToAttack === "computer") {
      setComputerField(fieldCopy);
    } else {
      setPlayerField(fieldCopy);
    }

    // logic after the hit
    if (cell.shipId) {
      if (playerToAttack === "person") {
        setComputerHits((hits) => [...hits, position]);
        setComputerMode("target");
      }

      checkIfShipDestroyed(fieldCopy, playerToAttack, cell.shipId);
    } else {
      // if attacked person, it is person's turn
      // if attacked computer, it is computer's turn
      setIsPlayerTurn(playerToAttack === "person");
    }
  };

  useEffect(() => {
    if (computerHits.length === 0) return;

    makeComputerMove();
  }, [computerHits]);

  useEffect(() => {
    if (!isPlayerTurn) makeComputerMove();
  }, [isPlayerTurn]);

  const checkIfShipDestroyed = (
    field: Field,
    playerAttacked: string,
    shipId: number
  ) => {
    const ship =
      playerAttacked === "computer"
        ? computerShips[shipId]
        : playerShips[shipId];

    if (ship.positions.every((id) => field[id].isHit)) {
      const setShips =
        playerAttacked === "computer" ? setComputerShips : setPlayerShips;

      setShips((ships) => ({
        ...ships,
        [shipId]: {
          ...ships[shipId],
          isDestroyed: true,
        },
      }));
    }
  };

  const makeComputerMove = () => {
    const nextShot =
      computerMode === "hunt"
        ? calculateNextHuntShot()
        : calculateNextTargetShot();

    attackPlayer("person", nextShot);
  };

  const calculateNextHuntShot = () => {
    // can't be undefined as the game would end
    const ship = getBiggestUndestroyedShip(playerShips) as Ship;

    const possiblePositions = getAllPossiblePositions(ship, playerField);

    //Each number determines how many times a cell has occured in possible positions.
    const probabilityMap: number[] = Array(100).fill(0);

    possiblePositions.forEach((positions) =>
      positions.forEach((index) => {
        probabilityMap[index]++;
      })
    );

    // get random cell with highest probability
    const maxProbability = Math.max(...probabilityMap);
    const maxProbabilityIndexes: number[] = [];

    probabilityMap.forEach((probability, index) => {
      if (probability === maxProbability) maxProbabilityIndexes.push(index);
    });

    return maxProbabilityIndexes[
      getRandomNumber(0, maxProbabilityIndexes.length - 1)
    ];
  };

  const getBiggestUndestroyedShip = (ships: Ships) => {
    for (let ship of Object.values(ships)) {
      if (!ship.isDestroyed) {
        return ship;
      }
    }
  };

  const getAllPossiblePositions = (ship: Ship, field: Field) => {
    const positions: number[][] = [];

    field.forEach((_, index) => {
      ["x", "y"].forEach((axis) => {
        const positionsToAdd = createShipPositions(
          index,
          ship.length,
          axis,
          playerField
        );

        if (positionsToAdd.length) positions.push(positionsToAdd);
      });
    });

    return positions;
  };

  const getPossibleTargets = (position: number, field: Field) => {
    const positions: number[] = [
      position - 1,
      position + 1,
      position - 10,
      position + 10,
    ];

    return positions.filter((pos) => {
      return (
        !isPositionOutOfBounds(pos) &&
        !field[pos].isHit &&
        !targetsStack.includes(pos)
      );
    });
  };

  const calculateNextTargetShot = () => {
    const newTargets = getPossibleTargets(
      computerHits.at(-1) as number,
      playerField
    );

    let nextMove: number;
    if (targetsStack.length === 0) {
      nextMove = newTargets[0];
      setTargetsStack(newTargets.slice(1));
    } else {
      nextMove = targetsStack[0];
      setTargetsStack((stack) => [...stack.slice(1), ...newTargets]);
    }

    return nextMove;
  };

  useEffect(() => {
    if (targetsStack.length === 0) setComputerMode("hunt");
  }, [targetsStack]);

  useEffect(() => {
    if (Object.values(playerShips).every((ship) => ship.isDestroyed)) {
      setGameStatus("computerWon");
    }
  }, [playerShips]);

  useEffect(() => {
    if (Object.values(computerShips).every((ship) => ship.isDestroyed)) {
      setGameStatus("playerWon");
    }
  }, [computerShips]);

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-6">
        <h2 className="text-right font-bold uppercase text-cyan-300 sm:text-2xl">
          Friendly waters
        </h2>
        <Field
          player="person"
          field={playerField}
          ships={playerShips}
          attackPlayer={attackPlayer}
          movesBlocked={false}
        />
      </div>
      <div className="flex flex-col gap-3 sm:gap-6">
        <h2 className="text-right font-bold uppercase text-orange-400 sm:text-2xl">
          Enemy waters
        </h2>
        <Field
          player="computer"
          field={computerField}
          ships={computerShips}
          attackPlayer={attackPlayer}
          movesBlocked={!isPlayerTurn}
        />
      </div>
    </>
  );
};

export default Game;
