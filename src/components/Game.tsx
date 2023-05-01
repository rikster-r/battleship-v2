import Field from "./Field";
import { useState, useEffect } from "react";

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

  const attackPlayer = (playerToAttack: string, position: number) => {
    // hit cell
    const fieldCopy = JSON.parse(
      JSON.stringify(
        playerToAttack === "computer" ? computerField : playerField
      )
    );
    const cell = fieldCopy[position];
    cell.isHit = true;

    // update field
    if (playerToAttack === "computer") {
      setComputerField(fieldCopy);
    } else {
      setPlayerField(fieldCopy);
    }

    // logic after the hit
    if (cell.shipId) {
      checkIfShipDestroyed(fieldCopy, playerToAttack, cell.shipId);

      // if computer has hit a ship, make another move
      if (!isPlayerTurn) makeComputerMove();
    } else {
      // if attacked person, it is person's turn
      // if attacked computer, it is computer's turn
      setIsPlayerTurn(playerToAttack === "person");
    }
  };

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

  const makeComputerMove = () => {};

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
