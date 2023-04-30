import { useState } from "react";
import { createField, createShips } from "./utils/creators";
import Setup from "./components/Setup";
import Game from "./components/Game";

function App() {
  const [playerField, setPlayerField] = useState(createField());
  const [computerField, setComputerField] = useState<Field>(createField());

  const [playerShips, setPlayerShips] = useState(createShips());
  const [computerShips, setComputerShips] = useState<Ships>(createShips());

  const [gameStatus, setGameStatus] = useState<
    "setup" | "inProgress" | "playerWon" | "computerWon"
  >("setup");

  if (gameStatus === "setup")
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[url('/worldMap.jpg')] bg-cover p-3">
        <Setup
          playerShips={playerShips}
          setPlayerShips={setPlayerShips}
          playerField={playerField}
          setPlayerField={setPlayerField}
          setComputerField={setComputerField}
          setComputerShips={setComputerShips}
          setGameStatus={setGameStatus}
        />
      </div>
    );

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[url('/worldMap.jpg')] bg-cover p-3">
      <div className="flex w-full max-w-max flex-col justify-center gap-6 rounded-md bg-neutral-900 bg-opacity-90 p-4 text-neutral-100 sm:gap-32 md:p-7 lg:flex-row">
        <Game
          playerField={playerField}
          setPlayerField={setPlayerField}
          computerField={computerField}
          setComputerField={setComputerField}
          playerShips={playerShips}
          setPlayerShips={setPlayerShips}
          computerShips={computerShips}
          setComputerShips={setComputerShips}
          setGameStatus={setGameStatus}
        />
      </div>
    </div>
  );
}

export default App;
