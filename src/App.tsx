import { useState } from "react";
import { createField, createShips } from "./utils/creators";
import Setup from "./components/Setup";

function App() {
  const [playerField, setPlayerField] = useState(createField());
  const [computerField, setComputerField] = useState();

  const [playerShips, setPlayerShips] = useState(createShips());
  const [computerShips, setComputerShips] = useState();

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // true when animations plays or when computer is taking its turn
  const [isMoveBlocked, setIsMoveBlocked] = useState(false);

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
        />
      </div>
    );

  return <></>;
}

export default App;
