import { Box, Typography } from "@mui/material";
import { useDrop } from "react-dnd";

const Day = ({ dateToDisplay, accept, onDrop, droppedItems }) => {
  const cars = [{ name: "OPEL" }, { name: "FERRARI" }, { name: "RENAULT" }];
  const regions = ["ΑΜΠΕΛΟΚΗΠΟΙ Κα ΜΑΡΙΑ", "ΨΥΧΙΚΟ"];
  const absences = ["ΓΙΩΡΓΟΣ"];

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  let cls = "";
  if (isActive) {
    cls = "isActive";
  } else if (canDrop) {
    cls = "isDroppable";
  }

  console.log(droppedItems);
  return (
    <Box ref={drop} className="day" p={1} display="flex" flexDirection="column">
      <div className="day-of-the-week">{dateToDisplay}</div>
      <div className={`droppable-container ${cls}`}>
        {isActive ? "Release to drop" : "This Container can host draggables"}
      </div>

      {/* DRIVERS AND REGIONS */}
      <Box
        display="flex"
        flexGrow={1}
        justifyContent="stretch"
        alignItems="stretch"
        className="tiles-container"
      >
        {cars?.map((car) => (
          <Box
            display="flex"
            flexDirection="column"
            className="tile"
            key={car.name}
            flexBasis={`${100 / cars.length}%`}
          >
            <Typography className="car-text">{car.name}</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="column"
              className="container-with-dragged-items"
            >
              <ul className="list drivers-list">
                {droppedItems?.map((itm) => (
                  <li key={itm}>
                    <Typography>{itm}</Typography>
                  </li>
                ))}
              </ul>
              <ul className="list regions-list">
                {regions?.map((itm) => (
                  <li key={itm}>
                    <Typography>{itm}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        ))}
      </Box>
      {/* ABSENCES */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <ul className="list drivers-list absences">
          {absences?.map((itm) => (
            <li key={itm}>
              <Typography>{itm}</Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Day;
