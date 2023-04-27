import { type ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  children?: ReactNode | ReactNode[];
  id: number;
};

const DraggableShip = ({ children, id }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      className="z-10 flex w-24 flex-col items-center justify-center rounded-xl border border-cyan-400 py-1 pb-3 opacity-100 sm:w-32 lg:aspect-square"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default DraggableShip;
