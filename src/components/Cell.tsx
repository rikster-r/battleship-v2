type Props = {
  cellId: number;
  data: Cell;
  ships: Ships;
  player: string;
};

const Cell = ({ cellId, data, ships, player }: Props) => {
  return (
    <div
      className={`${
        data.isHit || player === "person"
          ? ""
          : "hover:cursor-crosshair hover:bg-neutral-300 hover:bg-opacity-30"
      } relative flex aspect-square items-center justify-center border border-neutral-400`}
    ></div>
  );
};

export default Cell;
