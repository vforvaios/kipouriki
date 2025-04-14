// @ts-nocheck
import React, { useEffect, useState } from "react";
import { userLoggedIn, token } from "../models/selectors/loginSelectors";
import {
  AppBar,
  Toolbar,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser } from "../models/actions/loginActions";
import { enqueueSnackbar } from "notistack";

const TopBar = ({
  open,
  setOpen,
  schedule,
  allSchedules,
  refreshAllSchedules,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(
    schedule?.scheduleId
  );
  const userIsLoggedIn = useSelector(userLoggedIn);
  const userToken = useSelector(token);

  const handleDefaultSchedule = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_API_URL}/api/schedules/setdefault`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          method: "POST",
          body: JSON.stringify({
            scheduleId: selectedSchedule,
          }),
        }
      );

      const res = await resp.json();
      if (res.error) {
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        await refreshAllSchedules();
        enqueueSnackbar("Ολα πήγαν καλά!", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBar className={open ? "open" : ""} position="fixed" open={open}>
      <Toolbar>
        <div>
          {userIsLoggedIn && (
            <i
              className="icon-menu icon-menuIcon"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <div>
          {userIsLoggedIn && (
            <>
              <Select
                label="Προγράμματα"
                className="defaultSchedule"
                id="dropdownAllSchedules"
                value={selectedSchedule || ""}
                onChange={(e) => setSelectedSchedule(e.target.value)}
              >
                {allSchedules?.map((sc) => {
                  const firstMonday = new Date(sc?.startDate1);
                  const temp = new Date(sc?.startDate1);
                  temp.setDate(temp.getDate() + 13);
                  return (
                    <MenuItem
                      className="schedule-li-option"
                      key={`schedule-${sc?.id}`}
                      value={sc?.id}
                    >
                      {`${firstMonday?.toLocaleDateString("el-GR", {
                        weekday: "short",
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                      })} - ${new Date(temp)?.toLocaleDateString("el-GR", {
                        weekday: "short",
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                      })} ${sc?.isDefault ? "(Π)" : ""}`}
                    </MenuItem>
                  );
                })}
              </Select>
              <Button
                disabled={loading}
                onClick={() => {
                  handleDefaultSchedule();
                }}
                className="set-as-default-button"
              >
                Προεπιλογή
              </Button>
            </>
          )}
          <Button
            onClick={() => {
              if (!userIsLoggedIn) {
                setOpenLogin(true);
              } else {
                setOpen(false);
                dispatch(setLoginUser(null));
              }
            }}
            className={userIsLoggedIn ? "error" : "success"}
          >
            {userIsLoggedIn ? "Αποσύνδεση" : "Σύνδεση"}
          </Button>
        </div>
      </Toolbar>
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
    </AppBar>
  );
};

export default TopBar;
