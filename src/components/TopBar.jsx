import React, { useState } from "react";
import { userLoggedIn } from "../models/selectors/loginSelectors";
import { AppBar, Toolbar, Button } from "@mui/material";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser } from "../models/actions/loginActions";

const TopBar = ({ open, setOpen }) => {
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
        <Button
          onClick={() => {
            if (!userIsLoggedIn) {
              setOpenLogin(true);
            } else {
              dispatch(setLoginUser(null));
            }
          }}
          color="inherit"
        >
          {userIsLoggedIn ? "Αποσύνδεση" : "Σύνδεση"}
        </Button>
      </Toolbar>
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
    </AppBar>
  );
};

export default TopBar;
