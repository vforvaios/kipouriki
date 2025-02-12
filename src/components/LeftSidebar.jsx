import React, { useState } from "react";
import { Box, Drawer, Typography } from "@mui/material";

import DraggableBox from "./DraggableBox";

const drawerWidth = 240;

const LeftSidebar = ({ open, setOpen, itemTypes }) => {
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
      {Object.values(itemTypes)?.map((itm, index1) => (
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
      ))}
    </Drawer>
  );
};

export default LeftSidebar;
