import React from "react";
import { useSelector } from "react-redux";
import { Box, Drawer, Typography, Chip, Tooltip } from "@mui/material";
import { token } from "../models/selectors/loginSelectors";

import DraggableBox from "./DraggableBox";

const drawerWidth = 240;

const LeftSidebar = ({ draggables, open, setOpen }) => {
  const userToken = useSelector(token);

  return (
    userToken && (
      <Drawer
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box display="flex" p={1} justifyContent="flex-end" alignItems="center">
          <Tooltip title="Κλείσιμο">
            <i
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
              className="icon-cancel-circled"
            />
          </Tooltip>
        </Box>
        {Object.keys(draggables)?.map((itm) => (
          <Box key={`${itm}_${draggables[itm].id}`} p={1}>
            <Typography className="draggable-chips-title">{itm}</Typography>
            <Box display="flex" flexWrap="wrap">
              {draggables[itm].content.map(({ itemName, itemId }) => (
                <DraggableBox
                  id={itemId}
                  draggableCategory={draggables[itm].id}
                  name={itemName}
                  type={draggables[itm].id.toString()}
                  key={itemId}
                />
              ))}
            </Box>
            <Chip
              onClick={() => {}}
              className="draggable-chip plain"
              label="ΠΡΟΣΘΗΚΗ +"
              size="small"
            />
          </Box>
        ))}
      </Drawer>
    )
  );
};

export default LeftSidebar;
