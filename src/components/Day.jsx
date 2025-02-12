import { Box } from "@mui/material";
import { useDrop } from "react-dnd";

const Day = ({ dateToDisplay, accept, onDrop }) => {
  const cars = [{ name: "OPEL" }, { name: "FERRARI" }, { name: "RENAULT" }];

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <Box ref={drop} className="day" p={1} display="flex" flexDirection="column">
      <div className="day-of-the-week">{dateToDisplay}</div>
      <div>
        {isActive
          ? "Release to drop"
          : `This dustbin accepts: ${accept.join(", ")}`}
      </div>
      <Box
        display="flex"
        flexGrow={1}
        justifyContent="stretch"
        alignItems="stretch"
      >
        {cars?.map((car) => (
          <Box className="rotated-text" flexBasis={`${100 / cars.length}%`}>
            {car.name}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Day;
