import React, { useState } from "react";

import { AppBar, Toolbar, Button } from "@mui/material";
import Login from "./Login";

const TopBar = ({ open, setOpen }) => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <AppBar className={open ? "open" : ""} position="fixed" open={open}>
      <Toolbar>
        <i className="icon-menu icon-menuIcon" onClick={() => setOpen(!open)} />
        <Button onClick={() => setOpenLogin(true)} color="inherit">
          Login
        </Button>
      </Toolbar>
      <Login open={openLogin} handleClose={() => setOpenLogin(false)} />
    </AppBar>
  );
};

export default TopBar;
