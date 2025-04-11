// @ts-nocheck
import React, { useState } from "react";
import { userLoggedIn } from "../models/selectors/loginSelectors";
import { AppBar, Toolbar, Button, Select, MenuItem } from "@mui/material";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser } from "../models/actions/loginActions";

const TopBar = ({ open, setOpen, schedule, allSchedules }) => {
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState(false);
  const userIsLoggedIn = useSelector(userLoggedIn);

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
                className="defaultSchedule"
                id="dropdownAllSchedules"
                value={
                  allSchedules?.find((sc) => Boolean(sc?.isDefault))?.id || ""
                }
                onChange={() => {}}
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
                      })} - ${new Date(temp)?.toLocaleDateString("el-GR", {
                        weekday: "short",
                        month: "numeric",
                        day: "numeric",
                      })}`}
                    </MenuItem>
                  );
                })}
              </Select>
              <Button
                onClick={() => {
                  console.log(schedule);
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
