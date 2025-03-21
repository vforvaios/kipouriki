import React from "react";
import "./App.css";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { useMediaQuery } from "@mui/material";
import "./fontello/css/fontello.css";
import "./global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScheduleWrapper from "./components/ScheduleWrapper";

function App() {
  const matches = useMediaQuery("(min-width:1025px)", { noSsr: true });

  return (
    <DndProvider backend={matches ? HTML5Backend : TouchBackend}>
      <ScheduleWrapper />
    </DndProvider>
  );
}

export default App;
