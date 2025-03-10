import React from "react";
import { useDrag } from "react-dnd";
import { Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const DraggableBox = ({
  name,
  type,
  id,
  draggableCategory,
  setDialogState,
  dialogState,
}) => {
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
      label={
        <span>
          <span>{name}</span>
          <EditIcon
            onClick={() =>
              setDialogState({
                ...dialogState,
                openAddEditForm: true,
                draggableItemType: draggableCategory,
                type: "edit",
              })
            }
          />
        </span>
      }
      size="small"
      ref={drag}
      data-testid="box"
      style={{ opacity }}
    />
  );
};

export default DraggableBox;
