import React, { useState } from "react";
import "./App.css";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Calendar from "./components/Calendar";
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  useMediaQuery,
  Box,
} from "@mui/material";
import "./fontello/css/fontello.css";
import "./global.scss";
import DraggableBox from "../src/components/DraggableBox";

const drawerWidth = 240;
const ItemTypes = {
  FOOD: "food",
  GLASS: "glass",
  PAPER: "paper",
};

function App() {
  const matches = useMediaQuery("(min-width:1024px)", { noSsr: true });
  const [open, setOpen] = useState(false);
  const [boxes] = useState([
    { name: "Bottle", type: ItemTypes.GLASS },
    { name: "Banana", type: ItemTypes.FOOD },
    { name: "Magazine", type: ItemTypes.PAPER },
  ]);

  return (
    <DndProvider backend={matches ? HTML5Backend : TouchBackend}>
      <Box className="app-container" display="flex">
        <AppBar className={open ? "open" : ""} position="fixed" open={open}>
          <Toolbar>
            <i
              className="icon-menu icon-menuIcon"
              onClick={() => setOpen(!open)}
            />
          </Toolbar>
        </AppBar>
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
        <Calendar open={open} />
      </Box>
    </DndProvider>
  );
}

export default App;
