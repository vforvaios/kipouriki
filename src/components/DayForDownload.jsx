import React from "react";
import { allDraggables } from "../models/selectors/scheduleSelectors";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { generateDates } from "../utils/generateDates";

const DayForDownload = ({ dates, scheduleById }) => {
  console.log(scheduleById);
  const draggables = useSelector(allDraggables);

  return [
    ...generateDates(new Date(dates?.startDate1), draggables),
    ...generateDates(new Date(dates?.startDate2), draggables),
  ]?.map(({ dateToDisplay }, index) => {
    const stylableDay = dateToDisplay?.split(" ");
    return (
      <Box className="day for-download" p={1} display="flex">
        <div className="day-of-the-week">
          <strong className="day-text">{stylableDay?.[0]}</strong>
          <strong className="day-number">{stylableDay?.[1]}</strong>
        </div>
      </Box>
    );
  });
};

export default DayForDownload;
