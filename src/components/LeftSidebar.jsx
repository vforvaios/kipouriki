import React, { useState } from "react";
import { Box, Drawer, Typography } from "@mui/material";

import DraggableBox from "./DraggableBox";

const drawerWidth = 240;

const LeftSidebar = ({ draggables, open, setOpen }) => {
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
      {Object.keys(draggables)?.map((itm) => (
        <Box key={`${itm}_${draggables[itm].id}`} p={1}>
          <Typography className="draggable-chips-title">{itm}</Typography>
          <Box display="flex" flexWrap="wrap">
            {draggables[itm].content.map(({ itemName, itemId }) => (
              <DraggableBox
                id={itemId}
                draggableCategory={draggables[itm].id}
                name={itemName}
                type={draggables[itm].id.toString()}
                key={itemId}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Drawer>
  );
};

export default LeftSidebar;
