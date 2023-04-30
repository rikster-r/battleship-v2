import FieldShip from "./FieldShip";
import Cell from "./Cell";
import FieldWrapper from "./FieldWrapper";

type Props = {
  player: string;
  field: Field;
  ships: Ships;
  attackPlayer: (player: string, position: number) => void;
};

const Field = ({ player, field, ships, attackPlayer }: Props) => {
  return (
    <FieldWrapper>
      <div className="relative grid aspect-square grid-cols-[repeat(10,minmax(0,56px))] border border-neutral-400">
        {field.map((data, id) => (
          <Cell
            key={id}
            cellId={id}
            data={data}
            player={player}
            attackPlayer={attackPlayer}
          />
        ))}
        {Object.entries(ships).map(([id, ship]) => {
          if (
            player === "person" ||
            (player === "computer" && ship.isDestroyed)
          )
            return <FieldShip key={id} ship={ship} />;
        })}
      </div>
    </FieldWrapper>
  );
};

export default Field;
