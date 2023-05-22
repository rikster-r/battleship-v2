import { useState, useEffect } from "react";

type Props = {
  ships: Ships;
};

const ShipsList = ({ ships }: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // 1536px == tailwind 2xl
  const baseWidth = windowWidth > 1536 ? 35 : 25;
  const baseHeight = windowWidth > 1536 ? 40 : 30;

  return (
    <div className="mt-6 hidden flex-col gap-3 xl:flex">
      {Object.entries(ships).map(([id, ship]) => (
        <img
          key={id}
          src={`/${ship.image}`}
          alt={ship.name}
          className={ship.isDestroyed ? "opacity-30" : ""}
          style={{
            width: `${baseWidth * ship.length + 5}px`,
            height:
              ship.name === "Patrol Boat" ? baseHeight * 0.55 : baseHeight,
          }}
        />
      ))}
    </div>
  );
};

export default ShipsList;
