import React, { useState } from "react";
import { Box, Drawer, Typography, Chip, Tooltip } from "@mui/material";
import DraggableBox from "./DraggableBox";
import CreateOrEditDraggableItem from "./CreateOrEditDraggableItem";

const drawerWidth = 240;

const LeftSidebar = ({ draggables, open, setOpen }) => {
  const [dialogState, setDialogState] = useState({
    draggableItemType: 1,
    openAddEditForm: false,
    type: "create",
    itemName: "",
    itemIsActive: null,
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
        {Object.keys(draggables)?.map((itm) => (
          <Box key={`${itm}_${draggables[itm].id}`} p={1}>
            <Typography className="draggable-chips-title">{itm}</Typography>
            <Box display="flex" flexWrap="wrap">
              {draggables[itm].content.map(({ itemName, itemId, isActive }) => (
                <DraggableBox
                  dialogState={dialogState}
                  setDialogState={setDialogState}
                  id={itemId}
                  isActive={isActive}
                  draggableCategory={draggables[itm].id}
                  name={itemName}
                  key={itemId}
                  type={draggables[itm].id.toString()}
                />
              ))}
            </Box>
            <Chip
              onClick={() => {
                setDialogState({
                  ...dialogState,
                  draggableItemType: draggables[itm]?.id,
                  type: "create",
                  openAddEditForm: true,
                  itemName: "",
                  itemIsActive: 1,
                });
              }}
              className="draggable-chip plain"
              label="ΠΡΟΣΘΗΚΗ +"
              size="small"
            />
          </Box>
        ))}
      </div>
      <CreateOrEditDraggableItem
        dialogState={dialogState}
        setDialogState={setDialogState}
      />
    </Drawer>
  );
};

export default LeftSidebar;
