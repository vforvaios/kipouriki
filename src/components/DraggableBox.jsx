import React from "react";
import { useDrag } from "react-dnd";
import { Chip } from "@mui/material";

const DraggableBox = ({ name, type }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  );

  return (
    <Chip
      className="draggable-chip"
      label={name}
      size="small"
      ref={drag}
      data-testid="box"
      style={{ opacity }}
    />
  );
};

export default DraggableBox;
