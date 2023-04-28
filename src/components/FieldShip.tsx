import { motion } from "framer-motion";

type Props = {
  ship: Ship;
};

const FieldShip = ({ ship }: Props) => {
  if (ship.positions.length === 0) return <></>;

  const width = `${ship.length * 10}%`;
  const height = "10%";
  // get y, then multiply by 10 to get percentages and if axis is "y" add 10% to account for rotation shift
  const left = `${
    (ship.positions[0] % 10) * 10 + (ship.axis === "x" ? 0 : 10)
  }%`;
  // get x, then multiply by 10 to get percentages
  const top = `${Math.floor(ship.positions[0] / 10) * 10}%`;
  const transform = ship.axis === "x" ? "rotate(0deg)" : "rotate(90deg)";

  return (
    <div
      className="absolute flex origin-top-left select-none items-center justify-center pb-1"
      style={{
        width,
        height,
        left,
        top,
        transform,
      }}
    >
      <motion.div
        className="flex w-full items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <img
          src={`/${ship.image}`}
          alt={ship.name}
          className="h-full w-[90%]"
        />
      </motion.div>
    </div>
  );
};

export default FieldShip;