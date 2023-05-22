type Props = {
  cellId: number;
  data: Cell;
  attackPlayer: (player: string, position: number) => void;
  movesBlocked: boolean;
};

const Cell = ({ cellId, data, attackPlayer, movesBlocked }: Props) => {
  const allowClick = data.isHit || movesBlocked;

  const handleClick = () => {
    if (allowClick) return;

    attackPlayer("computer", cellId);
  };

  return (
    <div
      className={`${
        allowClick
          ? ""
          : "hover:cursor-crosshair hover:bg-neutral-300 hover:bg-opacity-30"
      } relative flex aspect-square items-center justify-center border border-neutral-400`}
      onClick={handleClick}
    >
      {data.isHit && (
        <div
          className={`${
            data.shipId ? "bg-red-500" : "bg-white"
          }  z-10 h-1/4 w-1/4 rounded-full`}
        ></div>
      )}
    </div>
  );
};

export default Cell;
