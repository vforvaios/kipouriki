import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import SkeletonCalendar from "./SkeletonCalendar";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { Box } from "@mui/material";

const ScheduleWrapper = () => {
  const ItemTypes = {
    DRIVERS: { name: "Drivers", color: "red" },
    REGIONS: { name: "Regions", color: "yellow" },
  };
  const generateDates = (start) => {
    const localDates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(start);
      date.setDate(date?.getDate() + i);
      localDates.push({
        dateToDisplay: date?.toLocaleDateString("el-GR", {
          weekday: "short",
          month: "numeric",
          day: "numeric",
        }),
        accepts: [ItemTypes.DRIVERS.name, ItemTypes.REGIONS.name],
        lastDroppedItem: null,
      });
    }
    return localDates;
  };

  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLastDates = async () => {
    try {
      const promiseResult = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dates`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const result = await promiseResult.json();

      if (result?.error) {
        enqueueSnackbar(result.error, { variant: "error" });
      } else {
        setDates(result?.dates?.[0]);
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLastDates();
  }, []);

  return (
    <>
      <SnackbarProvider autoHideDuration={5000} />
      <Box className="app-container" display="flex">
        <TopBar open={open} setOpen={setOpen} />
        <LeftSidebar itemTypes={ItemTypes} setOpen={setOpen} open={open} />
        {loading ? (
          <SkeletonCalendar />
        ) : (
          <Calendar
            allDatesFirstRow={generateDates(new Date(dates?.startDate1))}
            allDatesSecondRow={generateDates(new Date(dates?.startDate2))}
            open={open}
          />
        )}
      </Box>
    </>
  );
};

export default ScheduleWrapper;
