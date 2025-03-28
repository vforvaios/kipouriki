import React from "react";
import { Popover, Fade, Box } from "@mui/material";

const ManipulateListItemModal = ({
  popperStateForRemoving,
  type,
  setPopperStateForRemoving,
  initialPopperState,
  handleConvertDone,
  handleRemoveItemFormList,
}) => {
  return (
    <Popover
      open={popperStateForRemoving.open}
      anchorEl={popperStateForRemoving.anchorEl}
      onClose={() => setPopperStateForRemoving(initialPopperState)}
      id={
        Boolean(popperStateForRemoving.anchorEl)
          ? "transition-popper"
          : undefined
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box>
        <Box display="flex" flexDirection="column" className="removal-info">
          <span>Όνομα: {popperStateForRemoving.itm?.name}</span>
          <span>Μέρα: {popperStateForRemoving.day}</span>
          <span>Αυτοκίνητο: {popperStateForRemoving.car}</span>
        </Box>
        {type === "regions" && (
          <button
            className="dnh"
            onClick={() => {
              handleConvertDone(
                popperStateForRemoving.itm,
                popperStateForRemoving.day,
                popperStateForRemoving.car
              );
            }}
          >
            Δεν έγινε
          </button>
        )}
        <button
          onClick={() =>
            handleRemoveItemFormList(
              popperStateForRemoving.itm,
              popperStateForRemoving.day,
              popperStateForRemoving.car
            )
          }
        >
          Διαγραφή
        </button>
      </Box>
    </Popover>
  );
};

export default ManipulateListItemModal;
