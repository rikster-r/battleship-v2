import { useState } from 'react';

type Props = {
  playerShips: Ships;
  playerField: Field;
};

const Setup = ({ playerShips, playerField }: Props) => {
  const [axis, setAxis] = useState<'x' | 'y'>('x');

  return (
    <div className="flex flex-col gap-3">
      <div className="w-max bg-neutral-900 bg-opacity-90 rounded-md flex gap-8 text-neutral-100 justify-center p-7">
        <div className="flex flex-col gap-6 h-full">
          <div className="flex justify-center items-center gap-8">
            <button
              className={`${
                axis === 'x' ? 'bg-neutral-100 text-neutral-900' : ''
              } inline-block rounded-md border border-neutral-100 px-12 py-2.5 font-medium hover:scale-105 transition outline-none focus:bg-neutral-100 focus:text-neutral-900`}
              onClick={() => setAxis('x')}
            >
              X axis
            </button>
            <button
              className={`${
                axis === 'y' ? 'bg-neutral-100 text-neutral-900' : ''
              } inline-block rounded-md border border-neutral-100 px-12 py-2.5 font-medium hover:scale-105 transition outline-none`}
              onClick={() => setAxis('y')}
            >
              Y axis
            </button>
          </div>
          <div>
            <div className="flex ml-7">
              <div className="w-14 h-7 text-sm text-center">A</div>
              <div className="w-14 h-7 text-sm text-center">B</div>
              <div className="w-14 h-7 text-sm text-center">C</div>
              <div className="w-14 h-7 text-sm text-center">D</div>
              <div className="w-14 h-7 text-sm text-center">E</div>
              <div className="w-14 h-7 text-sm text-center">F</div>
              <div className="w-14 h-7 text-sm text-center">G</div>
              <div className="w-14 h-7 text-sm text-center">H</div>
              <div className="w-14 h-7 text-sm text-center">I</div>
              <div className="w-14 h-7 text-sm text-center">J</div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="w-7 h-14 text-sm text-right flex items-center">1</div>
                <div className="w-7 h-14 text-sm text-right flex items-center">2</div>
                <div className="w-7 h-14 text-sm text-right flex items-center">3</div>
                <div className="w-7 h-14 text-sm text-right flex items-center">4</div>
                <div className="w-7 h-14 text-sm text-right flex items-center">5</div>
                <div className="w-7 h-14 text-sm text-right flex items-center">6</div>
                <div className="w-7 h-14 text-sm text-right flex items-center">7</div>
                <div className="w-7 h-14 text-sm text-right flex items-center">8</div>
                <div className="w-7 h-14 text-sm text-right flex items-center">9</div>
                <div className="w-7 h-14 text-sm text-right flex items-center">10</div>
              </div>
              <div className="grid grid-cols-10">
                {playerField.map((row, rowIndex) =>
                  row.map((cell, cellIndex) => (
                    <div
                      className={`${rowIndex === 0 ? 'border-t-[2px]' : ''} 
                      ${rowIndex === 9 ? 'border-b-[2px]' : ''} ${
                        cellIndex === 0 ? 'border-l-[2px]' : ''
                      } ${
                        cellIndex === 9 ? 'border-r-[2px]' : ''
                      } w-14 h-14 flex justify-center items-center border border-neutral-400`}
                    ></div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 place-items-center">
          {Object.entries(playerShips).map(([id, ship]) => (
            <button
              key={id}
              className="aspect-square flex flex-col justify-center items-center border border-neutral-300 px-3 pt-2 pb-4 rounded-xl shadow-[0_0_10px_#226579]"
            >
              <img
                src={`/${ship.image}`}
                alt={ship.name}
                className="w-24 select-none"
                draggable="false"
              />
              <p className="capitalize text-neutral-300">
                {ship.name} ({ship.length})
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-neutral-900 bg-opacity-90 rounded-md flex gap-8 text-neutral-100 justify-center py-5">
        <button
          className="inline-block rounded-md border border-neutral-100 px-12 py-2.5 font-medium hover:scale-105 transition focus:outline-none active:bg-neutral-100 active:text-neutral-900"
          // todo
        >
          Reset
        </button>
        <button
          className="inline-block rounded-md border border-neutral-100 px-12 py-2.5 font-medium hover:scale-105 transition focus:outline-none active:bg-neutral-100 active:text-neutral-900"
          // todo
        >
          Random
        </button>
        <button
          className={`${
            Object.values(playerShips).some(ship => ship.positions.length === 0)
              ? 'hover:cursor-not-allowed'
              : 'hover:scale-105 transition focus:outline-none active:bg-neutral-100 active:text-neutral-900'
          } inline-block rounded-md border border-neutral-100 px-12 py-2.5 font-medium `}
          disabled={Object.values(playerShips).some(ship => ship.positions.length === 0)}
          // todo
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Setup;
