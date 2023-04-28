import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";

type Props = {
  id: number;
  ships: Ships;
  ship: Ship;
  resetShipPlacement: (id: number) => void;
};

const DraggableShip = ({ ships, id, ship, resetShipPlacement }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  if (ships[id].positions.length !== 0)
    return (
      <motion.button
        className="hover: hover: group z-10 flex w-24 flex-col items-center justify-center gap-2 rounded-xl  border-neutral-700 py-1 pt-2 opacity-100 hover:text-red-500 sm:w-32 lg:aspect-square"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => resetShipPlacement(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-10 w-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>

        <p className="text-xs capitalize sm:text-base">
          {ship.name} ({ship.length})
        </p>
      </motion.button>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        className="z-10 flex w-24 flex-col items-center justify-center rounded-xl border border-cyan-400 py-1 pb-3 opacity-100 sm:w-32 lg:aspect-square"
        style={style}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        <img
          src={`/${ship.image}`}
          alt={ship.name}
          className="w-16 select-none sm:w-24"
          draggable="false"
        />
        <p className="text-xs capitalize sm:text-base">
          {ship.name} ({ship.length})
        </p>
      </div>
    </motion.div>
  );
};

export default DraggableShip;
