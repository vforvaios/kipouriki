import React, { useState } from "react";
import { Drawer } from "@mui/material";

import DraggableBox from "./DraggableBox";

const drawerWidth = 240;
const ItemTypes = {
  FOOD: "food",
  GLASS: "glass",
  PAPER: "paper",
};

const LeftSidebar = ({ open, setOpen }) => {
  const [boxes] = useState([
    { name: "Bottle", type: ItemTypes.GLASS },
    { name: "Banana", type: ItemTypes.FOOD },
    { name: "Magazine", type: ItemTypes.PAPER },
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
      <div>
        {boxes.map(({ name, type }, index) => (
          <DraggableBox name={name} type={type} key={index} />
        ))}
      </div>
    </Drawer>
  );
};

export default LeftSidebar;
