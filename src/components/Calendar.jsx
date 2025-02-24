import React, { useState, useCallback } from "react";
import Day from "./Day";
import Box from "@mui/material/Box";

const Calendar = ({
  currentSchedule,
  open,
  allDatesFirstRow,
  allDatesSecondRow,
}) => {
  const [droppedBoxNames, setDroppedBoxNames] = useState(["GEORGE", "NICK"]);

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames([...droppedBoxNames, item.name]);
    },
    [droppedBoxNames]
  );
  return (
    <div className={`main-content ${open ? "open" : ""}`}>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Box
          className="days-row-container"
          flexBasis="50%"
          display="flex"
          flexDirection="row"
          gap={0.5}
          p={0.5}
        >
          {allDatesFirstRow.map(
            ({ dateToDisplay, accepts, lastDroppedItem }, index) => (
              <Day
                currentSchedule={Object.fromEntries(
                  Object.entries(currentSchedule).slice(0, 5)
                )}
                dateToDisplay={dateToDisplay}
                accept={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item) => handleDrop(index, item)}
                key={`${dateToDisplay}_${index}`}
                droppedItems={droppedBoxNames}
              />
            )
          )}
        </Box>
        <Box
          className="days-row-container"
          flexBasis="50%"
          display="flex"
          flexDirection="row"
          gap={1}
          p={1}
        >
          {allDatesSecondRow.map(
            ({ dateToDisplay, accepts, lastDroppedItem }, index) => (
              <Day
                currentSchedule={Object.fromEntries(
                  Object.entries(currentSchedule).slice(6, 10)
                )}
                dateToDisplay={dateToDisplay}
                accept={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item) => handleDrop(index, item)}
                key={`${dateToDisplay}_${index}`}
                droppedItems={droppedBoxNames}
              />
            )
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;
