import FieldShip from "./FieldShip";
import Cell from "./Cell";
import FieldWrapper from "./FieldWrapper";

type Props = {
  player: string;
  field: Field;
  ships: Ships;
};

const Field = ({ player, field, ships }: Props) => {
  return (
    <FieldWrapper>
      <div className="relative grid aspect-square grid-cols-[repeat(10,minmax(0,56px))] border border-neutral-400">
        {field.map((data, id) => (
          <Cell
            key={id}
            cellId={id}
            data={data}
            ships={ships}
            player={player}
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