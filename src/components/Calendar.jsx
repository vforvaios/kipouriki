import React, { useState, useCallback } from "react";
import Day from "./Day";
import Box from "@mui/material/Box";

const ItemTypes = {
  FOOD: "food",
  GLASS: "glass",
  PAPER: "paper",
};

const Calendar = ({ open }) => {
  const [initialDate, setInitialDate] = useState(new Date("2/3/2025"));
  const [initialDate2, setInitialDate2] = useState(new Date("2/10/2025"));
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

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
    },
    [droppedBoxNames]
  );
  return (
    <div className={`main-content ${open ? "open" : ""}`}>
      <Box display="flex" flexDirection="column" flexGrow={1}>
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
    </div>
  );
};

export default Calendar;
