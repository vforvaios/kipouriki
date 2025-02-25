import { Box, Tooltip, Typography } from "@mui/material";
import ListOfItems from "./ListOfItems";

const Day = ({ day, cars, currentSchedule, dateToDisplay, accept, onDrop }) => {
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
        {cars?.map((car, carIndex) => (
          <Box
            display="flex"
            flexDirection="column"
            className="tile"
            key={car.id}
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
              <ListOfItems
                type="drivers"
                accept={[accept?.[0] || ""]}
                onDrop={(item) => onDrop(car.id, item)}
                droppedItems={currentSchedule?.[day]?.[
                  carIndex
                ]?.drivers?.filter((dr) => !dr?.isAbsent)}
              />

              <ListOfItems
                type="regions"
                accept={[accept?.[1] || ""]}
                onDrop={(item) => onDrop(car.id, item)}
                droppedItems={currentSchedule?.[day]?.[carIndex]?.regions}
              />
            </Box>
          </Box>
        ))}
      </Box>
      {/* ABSENCES */}

      <Box
        style={{ minHeight: "20px" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ul className="list drivers-list absences">
          {[
            ...new Set(
              currentSchedule?.[day]?.map((sd) => sd?.drivers)?.flat()
            ),
          ]
            ?.filter((dr) => dr?.isAbsent)
            ?.map((itm) => (
              <li key={itm?.id}>
                <Tooltip title={itm?.name}>
                  <Typography>{itm?.name}</Typography>
                </Tooltip>
              </li>
            ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Day;
