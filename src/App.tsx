import { useState } from 'react';
import { createField, createShips } from './utils/initial';
import Setup from './components/Setup';

function App() {
  const [playerField, setPlayerField] = useState(createField());
  const [computerField, setComputerField] = useState(createField());

  const [playerShips, setPlayerShips] = useState(createShips());
  const [computerShips, setComputerShips] = useState(createShips());

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // true when animations plays or when computer is taking its turn
  const [isMoveBlocked, setIsMoveBlocked] = useState(false);

  const [gameStatus, setGameStatus] = useState<
    'setup' | 'inProgress' | 'playerWon' | 'computerWon'
  >('setup');

  if (gameStatus === 'setup')
    return (
      <div className="bg-[url('/worldMap.jpg')] min-h-[100dvh] bg-cover flex justify-center items-center">
        <Setup playerShips={playerShips} playerField={playerField} />
      </div>
    );

  return <></>;
}

export default App;
