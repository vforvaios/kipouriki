import React from "react";
import { useDrag } from "react-dnd";
import { Chip } from "@mui/material";

const DraggableBox = ({ name, type, id, draggableCategory }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { id, name, draggableCategory },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  );

  return (
    <Chip
      className={`draggable-chip ${
        draggableCategory === 1 ? "isDriver" : "isRegion"
      }`}
      label={name}
      size="small"
      ref={drag}
      data-testid="box"
      style={{ opacity }}
    />
  );
};

export default DraggableBox;
