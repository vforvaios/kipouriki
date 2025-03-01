import { Box, Typography } from "@mui/material";
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
        {cars?.map((car) => (
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
                car={car.id}
                day={day}
                type="drivers"
                accept={[accept?.[0] || ""]}
                onDrop={(item) => onDrop(car.id, item)}
                droppedItems={currentSchedule?.[day]?.cars?.[car.id]?.drivers}
              />

              <ListOfItems
                day={day}
                car={car.id}
                type="regions"
                accept={[accept?.[1] || ""]}
                onDrop={(item) => onDrop(car.id, item)}
                droppedItems={currentSchedule?.[day]?.cars?.[car.id]?.regions}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        style={{ minHeight: "20px" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ListOfItems
          type="absentDrivers"
          day={day}
          car={99}
          accept={[accept?.[0] || ""]}
          onDrop={(item) => onDrop("", item)}
          droppedItems={currentSchedule?.[day]?.cars?.[99]?.drivers?.filter(
            (dr) => dr?.isAbsent
          )}
        />
      </Box>
    </Box>
  );
};

export default Day;
