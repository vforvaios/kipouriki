import React, { useState, useEffect } from "react";
import {
  setDraggableItems,
  setCurrentSchedule,
  setCars,
} from "../models/actions/scheduleActions";
import {
  allDraggables,
  currentSchedule,
  allCars,
} from "../models/selectors/scheduleSelectors";
import Calendar from "./Calendar";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import Loader from "./Loader";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { manipulateFetchedDraggableItems } from "../utils/manipulateFetchedDraggableItems";
import { generateDates } from "../utils/generateDates";

const ScheduleWrapper = () => {
  const dispatch = useDispatch();
  const schedule = useSelector(currentSchedule);
  const draggables = useSelector(allDraggables);
  const cars = useSelector(allCars);

  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState(null);
  const [allSchedules, setAllSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllSchedules = async () => {
    try {
      const promiseResult = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_API_URL}/api/schedules`,
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
        setAllSchedules(result);
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  const fetchLastDates = async () => {
    try {
      const promiseResult = await fetch(
        // @ts-ignore
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
    }
  };

  const fetchDraggableItems = async () => {
    try {
      const promiseResult = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_API_URL}/api/draggable-items`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const result = await promiseResult.json();

      // const itemsToBeSaved = manipulateFetchedDraggableItems(result.items);

      if (result?.error) {
        enqueueSnackbar(result.error, { variant: "error" });
      } else {
        dispatch(setDraggableItems(result.items));
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  const fetchCurrentSchedule = async () => {
    try {
      const promiseResult = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_API_URL}/api/schedules/current`,
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
        dispatch(setCurrentSchedule(result?.currentSchedule));
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  const fetchCars = async () => {
    try {
      const promiseResult = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_API_URL}/api/cars`,
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
        dispatch(setCars(result.cars));
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  const handleAllFetches = async () => {
    await fetchCars();
    await fetchLastDates();
    await fetchAllSchedules();
    await fetchDraggableItems();
    await fetchCurrentSchedule();
    setLoading(false);
  };

  useEffect(() => {
    handleAllFetches();
  }, []);

  return (
    <>
      <SnackbarProvider autoHideDuration={5000} />
      <Box className="app-container">
        <TopBar
          open={open}
          setOpen={setOpen}
          schedule={schedule}
          allSchedules={allSchedules}
          refreshAllSchedules={fetchAllSchedules}
        />
        <LeftSidebar
          draggables={manipulateFetchedDraggableItems(draggables)}
          setOpen={setOpen}
          open={open}
        />
        {loading ? (
          <Loader smaller={false} />
        ) : (
          <Calendar
            currentSchedule={schedule}
            allDatesFirstRow={generateDates(
              new Date(dates?.startDate1),
              draggables
            )}
            allDatesSecondRow={generateDates(
              new Date(dates?.startDate2),
              draggables
            )}
            open={open}
            fetchCurrentSchedule={fetchCurrentSchedule}
          />
        )}
      </Box>
    </>
  );
};

export default ScheduleWrapper;
