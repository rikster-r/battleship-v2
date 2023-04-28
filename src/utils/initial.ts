export const createField = (): Field => {
  return Array(100).fill({
    isHit: false,
  });
};

export const createShips = (): Ships => {
  return {
    1: {
      positions: [],
      length: 4,
      isDestroyed: false,
      image: "carrier.png",
      name: "Carrier",
    },
    2: {
      positions: [],
      length: 3,
      isDestroyed: false,
      image: "battleship.png",
      name: "Battleship",
    },
    3: {
      positions: [],
      length: 3,
      isDestroyed: false,
      image: "battleship.png",
      name: "Battleship",
    },
    4: {
      positions: [],
      length: 2,
      isDestroyed: false,
      image: "destroyer.png",
      name: "Destroyer",
    },
    5: {
      positions: [],
      length: 2,
      isDestroyed: false,
      image: "destroyer.png",
      name: "Destroyer",
    },
    6: {
      positions: [],
      length: 2,
      isDestroyed: false,
      image: "destroyer.png",
      name: "Destroyer",
    },
    7: {
      positions: [],
      length: 1,
      isDestroyed: false,
      image: "patrolBoat.png",
      name: "Patrol Boat",
    },
    8: {
      positions: [],
      length: 1,
      isDestroyed: false,
      image: "patrolBoat.png",
      name: "Patrol Boat",
    },
    9: {
      positions: [],
      length: 1,
      isDestroyed: false,
      image: "patrolBoat.png",
      name: "Patrol Boat",
    },
    10: {
      positions: [],
      length: 1,
      isDestroyed: false,
      image: "patrolBoat.png",
      name: "Patrol Boat",
    },
  };
};
