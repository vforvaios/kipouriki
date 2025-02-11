import { Box } from "@mui/material";
import { useDrop } from "react-dnd";

const Day = ({ dateToDisplay, accept, onDrop }) => {
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
    </Box>
  );
};

export default Day;
