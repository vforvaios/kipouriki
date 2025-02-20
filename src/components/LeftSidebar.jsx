import React, { useState } from "react";
import { Box, Drawer, Typography } from "@mui/material";

import DraggableBox from "./DraggableBox";

const drawerWidth = 240;

const LeftSidebar = ({ draggables, open, setOpen, itemTypes }) => {
  console.log(draggables);
  const [boxes] = useState([
    { name: "ALI", type: itemTypes.DRIVERS.name },
    { name: "ΚΤΗΜΑ ΑΜΠΕΛΟΚΗΠΩΝ", type: itemTypes.REGIONS.name },
  ]);

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
      {/* {Object.values(itemTypes)?.map((itm, index1) => (
        <Box key={`${itm.name}_${index1}`} p={1}>
          <Typography className="draggable-chips-title">{itm.name}</Typography>
          <Box display="flex" flexWrap="wrap">
            {boxes
              .filter((bx) => bx.type === itm.name)
              .map(({ name, type }, index) => (
                <DraggableBox name={name} type={type} key={index} />
              ))}
          </Box>
        </Box>
      ))} */}
      {Object.keys(draggables)?.map((itm) => (
        <Box key={`${itm}_${draggables[itm].id}`} p={1}>
          <Typography className="draggable-chips-title">{itm}</Typography>
          <Box display="flex" flexWrap="wrap">
            {draggables[itm].content
              // .filter((bx) => bx.type === itm.name)
              .map(({ itemName, itemId }) => (
                <DraggableBox
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
