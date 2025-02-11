import React from "react";
import "./App.css";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Calendar from "./components/Calendar";
import useMediaQuery from "@mui/material/useMediaQuery";

import "./global.scss";

function App() {
  const matches = useMediaQuery("(min-width:1024px)", { noSsr: true });

  return (
    <DndProvider backend={matches ? HTML5Backend : TouchBackend}>
      <Calendar />
    </DndProvider>
  );
}

export default App;
