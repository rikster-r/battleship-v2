import { useState, useEffect } from "react";
import { createField, createShips } from "./utils/creators";
import Setup from "./components/Setup";
import Game from "./components/Game";
import { motion } from "framer-motion";

function App() {
  const [playerField, setPlayerField] = useState(createField());
  const [computerField, setComputerField] = useState<Field>(createField());

  const [playerShips, setPlayerShips] = useState(createShips());
  const [computerShips, setComputerShips] = useState<Ships>(createShips());

  const [gameStatus, setGameStatus] = useState<
    "setup" | "inProgress" | "playerWon" | "computerWon"
  >("setup");

  const resetGame = () => {
    setComputerField(createField());
    setPlayerField(createField());
    setPlayerShips(createShips());
    setComputerShips(createShips());
    setGameStatus("setup");
  };

  useEffect(() => {
    if (gameStatus === "playerWon" || gameStatus === "computerWon") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [gameStatus]);

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
    <>
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
      {(gameStatus === "playerWon" || gameStatus === "computerWon") && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-left sm:p-0">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div className="mt-3 bg-white px-4 pb-4 pt-5 text-center sm:mt-0 sm:p-6 sm:pb-4 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {gameStatus === "playerWon" ? "You won!" : "You lost!"}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {gameStatus === "playerWon"
                      ? "Congratulations on your victory! You have emerged as the champion of this epic battle. Your strategic prowess and tactical skills have led you to triumph over your opponent. Would you like to play again?"
                      : "We're sorry to inform you that you have been defeated in this battle on the high seas. But don't let this loss get you down. Remember, every setback is an opportunity to learn and grow. Would you like to try again?"}
                  </p>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                    onClick={resetGame}
                  >
                    Restart
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
