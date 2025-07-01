import React, { useState } from "react";
import { Box, Drawer, Tooltip } from "@mui/material";
import CreateOrEditDraggableItem from "./CreateOrEditDraggableItem";
import DraggableContainer from "./DraggableContainer";

const drawerWidth = 240;

const LeftSidebar = ({ draggables, open, setOpen }) => {
  const [dialogState, setDialogState] = useState({
    draggableItemType: 1,
    openAddEditForm: false,
    type: "create",
    itemName: "",
    itemIsActive: null,
    regionCategory: null,
    itemId: null,
  });

  return (
    <Drawer
      onClose={() => setOpen(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box display="flex" p={1} justifyContent="flex-end" alignItems="center">
        <Tooltip title="Κλείσιμο">
          <i
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
            className="icon-cancel-circled"
          />
        </Tooltip>
      </Box>
      <div className="leftsidebar-scrollable">
        {Object.keys(draggables)?.map((itm) =>
          Object.keys(draggables?.[itm])?.map((innerItem) => (
            <DraggableContainer
              key={`${itm}_${innerItem}_${draggables?.[itm]?.[innerItem]?.id}`}
              itm={itm}
              innerItem={innerItem}
              draggables={draggables}
              dialogState={dialogState}
              setDialogState={setDialogState}
            />
          ))
        )}
      </div>
      <CreateOrEditDraggableItem
        dialogState={dialogState}
        setDialogState={setDialogState}
      />
    </Drawer>
  );
};

export default LeftSidebar;
