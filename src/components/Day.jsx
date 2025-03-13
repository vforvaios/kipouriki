import { Box, Tooltip, Typography } from "@mui/material";
import ListOfItems from "./ListOfItems";
import useMediaQuery from "@mui/material/useMediaQuery";

const Day = ({
  day,
  cars,
  currentSchedule,
  scheduleId,
  dateToDisplay,
  accept,
  onDrop,
  fetchCurrentSchedule,
}) => {
  const stylableDay = dateToDisplay?.split(" ");
  const matches = useMediaQuery("(max-width:960)");

  return (
    <Box className="day" p={1} display="flex" flexDirection="column">
      <div
        className={`day-of-the-week ${
          dateToDisplay ===
          new Date()?.toLocaleDateString("el-GR", {
            weekday: "short",
            month: "numeric",
            day: "numeric",
          })
            ? "today"
            : ""
        }`}
      >
        <strong className="day-text">{stylableDay?.[0]}</strong>
        <strong className="day-number">{stylableDay?.[1]}</strong>
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
            key={car.id}
            flexBasis={"20%"}
            width={"20%"}
          >
            <Tooltip title={car.name}>
              <Typography className="car-text">{car.name}</Typography>
            </Tooltip>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="column"
              className="container-with-dragged-items"
            >
              <ListOfItems
                fetchCurrentSchedule={fetchCurrentSchedule}
                scheduleId={scheduleId}
                car={car.id}
                day={day}
                type="drivers"
                accept={[accept?.[0] || ""]}
                onDrop={(item) => onDrop(car.id, item)}
                droppedItems={currentSchedule?.[day]?.cars?.[car.id]?.drivers}
              />

              <ListOfItems
                fetchCurrentSchedule={fetchCurrentSchedule}
                scheduleId={scheduleId}
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
          fetchCurrentSchedule={fetchCurrentSchedule}
          scheduleId={currentSchedule?.scheduleId}
          type="absentDrivers"
          day={day}
          car={99}
          accept={[accept?.[0] || ""]}
          onDrop={(item) => onDrop(99, item)}
          droppedItems={currentSchedule?.[day]?.cars?.[99]?.drivers}
        />
      </Box>
    </Box>
  );
};

export default Day;
