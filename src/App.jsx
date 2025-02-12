import React, { useState } from "react";
import "./App.css";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Calendar from "./components/Calendar";
import TopBar from "./components/TopBar";
import LeftSidebar from "./components/LeftSidebar";
import { useMediaQuery, Box } from "@mui/material";
import "./fontello/css/fontello.css";
import "./global.scss";

function App() {
  const matches = useMediaQuery("(min-width:1024px)", { noSsr: true });
  const [open, setOpen] = useState(false);

  return (
    <DndProvider backend={matches ? HTML5Backend : TouchBackend}>
      <Box className="app-container" display="flex">
        <TopBar open={open} setOpen={setOpen} />
        <LeftSidebar setOpen={setOpen} open={open} />
        <Calendar open={open} />
      </Box>
    </DndProvider>
  );
}

export default App;
