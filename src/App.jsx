import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import "./App.css";
import { useState } from "react";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Day from "./components/Day";
import DraggableBox from "./components/DraggableBox";
import useMediaQuery from "@mui/material/useMediaQuery";

const ItemTypes = {
  FOOD: "food",
  GLASS: "glass",
  PAPER: "paper",
};

function App() {
  const matches = useMediaQuery("(min-width:1024px)", { noSsr: true });
  console.log(matches);
  const [initialDate, setInitialDate] = useState(new Date("2/3/2025"));
  const [initialDate2, setInitialDate2] = useState(new Date("2/10/2025"));
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  const [boxes] = useState([
    { name: "Bottle", type: ItemTypes.GLASS },
    { name: "Banana", type: ItemTypes.FOOD },
    { name: "Magazine", type: ItemTypes.PAPER },
  ]);

  const generateDates = (start) => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      dates.push({
        dateToDisplay: date.toLocaleDateString("el-GR", {
          weekday: "short",
          month: "numeric",
          day: "numeric",
        }),
        accepts: [ItemTypes.GLASS, ItemTypes.PAPER],
        lastDroppedItem: null,
      });
    }
    return dates;
  };

  const [allDatesFirstRow, setAllDatesFirstRow] = useState(
    generateDates(initialDate)
  );

  const [allDatesSecondRow, setAllDatesSecondRow] = useState(
    generateDates(initialDate2)
  );

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      // setDustbins(
      //   update(dustbins, {
      //     [index]: {
      //       lastDroppedItem: {
      //         $set: item,
      //       },
      //     },
      //   })
      // );
    },
    [droppedBoxNames]
  );

  return (
    <DndProvider backend={matches ? HTML5Backend : TouchBackend}>
      {boxes.map(({ name, type }, index) => (
        <DraggableBox name={name} type={type} key={index} />
      ))}
      <Box width="100vw" height="100vh" display="flex" flexDirection="column">
        <Box flexBasis="50%" display="flex" flexDirection="row" gap={1} p={1}>
          {allDatesFirstRow.map(
            ({ dateToDisplay, accepts, lastDroppedItem }, index) => (
              <Day
                dateToDisplay={dateToDisplay}
                accept={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item) => handleDrop(index, item)}
                key={index}
              />
            )
          )}
        </Box>
        <Box flexBasis="50%" display="flex" flexDirection="row" gap={1} p={1}>
          {allDatesSecondRow.map(
            ({ dateToDisplay, accepts, lastDroppedItem }, index) => (
              <Day
                dateToDisplay={dateToDisplay}
                accept={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item) => handleDrop(index, item)}
                key={index}
              />
            )
          )}
        </Box>
      </Box>
    </DndProvider>
  );
}

export default App;
