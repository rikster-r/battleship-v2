import Field from "./Field";
import React, { useState } from "react";

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

  const attackPlayer = (player: string, position: number) => {
    // hit cell
    const fieldCopy = JSON.parse(
      JSON.stringify(player === "computer" ? computerField : playerField)
    );
    const cell = fieldCopy[position];
    cell.isHit = true;

    // update field
    if (player === "computer") {
      setComputerField(fieldCopy);
    } else {
      setPlayerField(fieldCopy);
    }

    // logic after the hit
    if (cell.shipId) {
      checkIfShipDestroyed(fieldCopy, player, cell.shipId);

      if (!isPlayerTurn) makeComputerMove();
    } else {
      // if attacked person, it is person's turn
      // if attacked computer, it is computer's turn
      setIsPlayerTurn(player === "person");
    }
  };

  const checkIfShipDestroyed = (
    field: Field,
    player: string,
    shipId: number
  ) => {
    const ship =
      player === "computer" ? computerShips[shipId] : playerShips[shipId];

    if (ship.positions.every((id) => field[id].isHit === true)) {
      const setShips =
        player === "computer" ? setComputerShips : setPlayerShips;

      setShips((ships) => ({
        ...ships,
        [shipId]: {
          ...ships[shipId],
          isDestroyed: true,
        },
      }));

      checkVictoryStatus();
    }
  };

  const makeComputerMove = () => {
    // todo
  };

  const checkVictoryStatus = () => {
    // todo
  };

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
        />
      </div>
    </>
  );
};

export default Game;
