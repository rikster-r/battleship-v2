type Props = {
  cellId: number;
  data: Cell;
  player: string;
  attackPlayer: (player: string, position: number) => void;
};

const Cell = ({ cellId, data, player, attackPlayer }: Props) => {
  const handleClick = () => {
    if (player === "person" || data.isHit) return;

    attackPlayer("computer", cellId);
  };

  return (
    <div
      className={`${
        data.isHit || player === "person"
          ? ""
          : "hover:cursor-crosshair hover:bg-neutral-300 hover:bg-opacity-30"
      } relative flex aspect-square items-center justify-center border border-neutral-400`}
      onClick={handleClick}
    >
      {data.isHit && (
        <div
          className={`${
            data.shipId ? "bg-red-500" : "bg-white"
          }  z-10 h-1/3 w-1/3 rounded-full`}
        ></div>
      )}
    </div>
  );
};

export default Cell;
