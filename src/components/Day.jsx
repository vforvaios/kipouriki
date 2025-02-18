import { Box, Tooltip, Typography } from "@mui/material";
import DriversList from "./DriversList";
import RegionsList from "./RegionsList";

const Day = ({ dateToDisplay, accept, onDrop, droppedItems }) => {
  const cars = [
    { name: "OPEL" },
    { name: "FERRARI" },
    { name: "RENAULT" },
    { name: "ALFA ROMEO" },
  ];
  const regions = ["ΑΜΠΕΛΟΚΗΠΟΙ Κα ΜΑΡΙΑ", "ΨΥΧΙΚΟ"];
  const absences = ["ΓΙΩΡΓΟΣ"];

  return (
    <Box className="day" p={1} display="flex" flexDirection="column">
      <div className="day-of-the-week">{dateToDisplay}</div>

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
            width={`${100 / cars.length}%`}
          >
            <Typography className="car-text">{car.name}</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="column"
              className="container-with-dragged-items"
            >
              <DriversList
                accept={[accept[0]]}
                onDrop={onDrop}
                droppedItems={droppedItems}
              />

              <RegionsList
                accept={[accept[1]]}
                onDrop={onDrop}
                regions={regions}
              />
            </Box>
          </Box>
        ))}
      </Box>
      {/* ABSENCES */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <ul className="list drivers-list absences">
          {absences?.map((itm) => (
            <li key={itm}>
              <Tooltip title={itm}>
                <Typography>{itm}</Typography>
              </Tooltip>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Day;
