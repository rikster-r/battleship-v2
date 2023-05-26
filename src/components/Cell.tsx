import { motion } from "framer-motion";

type Props = {
  cellId: number;
  data: Cell;
  attackPlayer: (player: string, position: number) => void;
  movesBlocked: boolean;
};

const Cell = ({ cellId, data, attackPlayer, movesBlocked }: Props) => {
  const allowClick = data.isHit || movesBlocked;
  const cellColor = data.shipId ? "bg-red-500" : "bg-white";

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
        <>
          <motion.div
            className={`${cellColor} absolute h-1/4 w-1/4 rounded-full opacity-40`}
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 6, 0],
              transition: {
                duration: 0.5,
                ease: "easeInOut",
                times: [0, 0.2, 1],
              },
            }}
          ></motion.div>
          <motion.div
            className={`${cellColor} z-10 h-1/4 w-1/4 rounded-full`}
            initial={{
              opacity: 0.8,
              x: -100,
              y: -100,
              width: "100%",
              rotate: 45,
            }}
            animate={{ opacity: 1, x: 0, y: 0, width: "25%" }}
            transition={{
              type: "spring",
              mass: 0.1,
              damping: 20,
              stiffness: 500,
            }}
          ></motion.div>
        </>
      )}
    </div>
  );
};

export default Cell;
