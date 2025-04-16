// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { setCurrentSchedule } from "../models/actions/scheduleActions";
import { token } from "../models/selectors/loginSelectors";
import Day from "./Day";
import SliderDays from "./SliderDays";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { updatedCurrentSchedule } from "../utils";
import Slider from "react-slick";
import { allCars } from "../models/selectors/scheduleSelectors";

const Calendar = ({
  currentSchedule,
  open,
  allDatesFirstRow,
  allDatesSecondRow,
  fetchCurrentSchedule,
}) => {
  const dispatch = useDispatch();
  const userToken = useSelector(token);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  const findToday = () => {
    return [...allDatesFirstRow, ...allDatesSecondRow].findIndex(
      (d) =>
        d.dateToDisplay ===
        new Date()?.toLocaleDateString("el-GR", {
          weekday: "short",
          month: "numeric",
          day: "numeric",
        })
    );
  };

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  useEffect(() => {
    sliderRef1.slickGoTo(findToday());
    sliderRef2.slickGoTo(findToday());
  }, [sliderRef1, sliderRef2, allDatesFirstRow, allDatesSecondRow]);

  const handleDrop = async (car, day, item) => {
    const currentScheduleId = currentSchedule?.scheduleId;

    const itemAlreadyExistsInSuchDayAndCar =
      item.draggableCategory === 1
        ? currentSchedule?.days?.[day]?.cars?.[car]?.drivers.filter(
            (dr) => dr.id === item.id
          )?.length
        : currentSchedule?.days?.[day]?.cars?.[car]?.regions.filter(
            (rg) => rg.id === item.id
          )?.length;
    if (!itemAlreadyExistsInSuchDayAndCar) {
      try {
        // @ts-ignore
        const resp = await fetch(
          `${import.meta.env.VITE_API_URL}/api/schedules/current/addItem`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            method: "POST",
            body: JSON.stringify({
              scheduleId: currentScheduleId,
              day,
              carId: car,
              item,
            }),
          }
        );

        const res = await resp.json();

        if (res.error) {
          enqueueSnackbar(res.error, { variant: "error" });
        } else {
          const updatedSchedule = updatedCurrentSchedule(
            currentSchedule,
            day,
            car,
            item
          );

          dispatch(setCurrentSchedule(updatedSchedule));
        }
      } catch (error) {
        enqueueSnackbar(error, { variant: "error" });
      }
    } else {
      enqueueSnackbar("Το αντικείμενο υπάρχει ήδη στην λίστα.", {
        variant: "error",
      });
    }
  };

  const daysSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
  };

  const calendarDaysSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    cssEase: "linear",
  };

  return (
    <div className={`main-content ${open ? "open" : ""}`}>
      <Box>
        <Box
          className="asNavForClass"
          display="flex"
          sx={{ margin: "0 auto", maxWidth: "600px" }}
        >
          <Slider
            {...daysSliderSettings}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
          >
            {[...allDatesFirstRow, ...allDatesSecondRow].map(
              ({ dateToDisplay }, index) => (
                <SliderDays
                  dateToDisplay={dateToDisplay}
                  key={`asnavfor-${index}`}
                />
              )
            )}
          </Slider>
        </Box>
        <Box className="days-row-container" p={0.5}>
          <Slider
            {...calendarDaysSliderSettings}
            asNavFor={nav1}
            ref={(slider) => (sliderRef2 = slider)}
          >
            {[...allDatesFirstRow, ...allDatesSecondRow].map(
              ({ dateToDisplay, accepts }, index) => (
                <Day
                  fetchCurrentSchedule={fetchCurrentSchedule}
                  scheduleId={currentSchedule?.scheduleId}
                  currentSchedule={Object.keys(
                    currentSchedule.days || {}
                  ).reduce(
                    (acc, curr) => ({
                      ...acc,
                      [curr]: currentSchedule.days[curr],
                    }),
                    {}
                  )}
                  day={index + 1}
                  dateToDisplay={dateToDisplay}
                  accept={accepts}
                  onDrop={(car, item) => handleDrop(car, index + 1, item)}
                  key={`${dateToDisplay}_${index}`}
                />
              )
            )}
          </Slider>
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;
