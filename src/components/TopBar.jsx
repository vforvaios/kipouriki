import React from "react";

import { AppBar, Toolbar } from "@mui/material";

const TopBar = ({ open, setOpen }) => {
  return (
    <AppBar className={open ? "open" : ""} position="fixed" open={open}>
      <Toolbar>
        <i className="icon-menu icon-menuIcon" onClick={() => setOpen(!open)} />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
