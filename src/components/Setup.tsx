import { useState } from "react";

type Props = {
  playerShips: Ships;
  playerField: Field;
};

const Setup = ({ playerShips, playerField }: Props) => {
  const [axis, setAxis] = useState<"x" | "y">("x");

  return (
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
          <div className="grid aspect-square w-full max-w-max grid-cols-[16px_1fr] grid-rows-[16px_1fr] gap-2 md:gap-4">
            <div className="col-start-2 grid grid-cols-[repeat(10,minmax(0,56px))]">
              <div className="text-center text-xs sm:text-sm">A</div>
              <div className="text-center text-xs sm:text-sm">B</div>
              <div className="text-center text-xs sm:text-sm">C</div>
              <div className="text-center text-xs sm:text-sm">D</div>
              <div className="text-center text-xs sm:text-sm">E</div>
              <div className="text-center text-xs sm:text-sm">F</div>
              <div className="text-center text-xs sm:text-sm">G</div>
              <div className="text-center text-xs sm:text-sm">H</div>
              <div className="text-center text-xs sm:text-sm">I</div>
              <div className="text-center text-xs sm:text-sm">J</div>
            </div>
            <div className="grid">
              <div className="flex items-center justify-center text-xs sm:text-sm">
                1
              </div>
              <div className="flex items-center justify-center text-xs sm:text-sm">
                2
              </div>
              <div className="flex items-center justify-center text-xs sm:text-sm">
                3
              </div>
              <div className="flex items-center justify-center text-xs sm:text-sm">
                4
              </div>
              <div className="flex items-center justify-center text-xs sm:text-sm">
                5
              </div>
              <div className="flex items-center justify-center text-xs sm:text-sm">
                6
              </div>
              <div className="flex items-center justify-center text-xs sm:text-sm">
                7
              </div>
              <div className="flex items-center justify-center text-xs sm:text-sm">
                8
              </div>
              <div className="flex items-center justify-center text-xs sm:text-sm">
                9
              </div>
              <div className="flex items-center justify-center text-xs sm:text-sm">
                10
              </div>
            </div>

            <div className="field grid aspect-square grid-cols-[repeat(10,minmax(0,56px))]">
              {playerField.map((row) =>
                row.map((cell) => (
                  <div className="flex aspect-square items-center justify-center border border-neutral-400"></div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-1 lg:grid lg:grid-cols-2">
          {Object.entries(playerShips).map(([id, ship]) => (
            <button
              key={id}
              className="flex w-24 flex-col items-center justify-center rounded-xl border border-cyan-400 py-1 pb-3 sm:w-32 lg:aspect-square"
            >
              <img
                src={`/${ship.image}`}
                alt={ship.name}
                className="w-16 select-none sm:w-24"
                draggable="false"
              />
              <p className="text-xs capitalize text-neutral-300 sm:text-base">
                {ship.name} ({ship.length})
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center gap-4 rounded-md bg-neutral-900 bg-opacity-90 py-5 text-neutral-100">
        <button
          className="inline-block rounded-md border border-neutral-100 px-6 py-2.5 text-xs font-medium transition hover:scale-105 active:bg-neutral-100 active:text-neutral-900 sm:px-12 sm:text-base"
          // todo
        >
          Reset
        </button>
        <button
          className="inline-block rounded-md border border-neutral-100 px-6 py-2.5 text-xs font-medium transition hover:scale-105 active:bg-neutral-100 active:text-neutral-900 sm:px-12 sm:text-base"
          // todo
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
          // todo
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Setup;
