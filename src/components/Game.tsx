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

  // true when animations plays or when computer is taking its turn
  const [isMoveBlocked, setIsMoveBlocked] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-6">
        <h2 className="text-right font-bold uppercase text-cyan-300 sm:text-2xl">
          Friendly waters
        </h2>
        <Field player="person" field={playerField} ships={playerShips} />
      </div>
      <div className="flex flex-col gap-3 sm:gap-6">
        <h2 className="text-right font-bold uppercase text-orange-400 sm:text-2xl">
          Enemy waters
        </h2>
        <Field player="computer" field={computerField} ships={computerShips} />
      </div>
    </>
  );
};

export default Game;
