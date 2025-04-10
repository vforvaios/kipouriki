import React, { useState } from "react";
import { Box, Drawer, Typography, Chip, Tooltip } from "@mui/material";
import DraggableBox from "./DraggableBox";
import CreateOrEditDraggableItem from "./CreateOrEditDraggableItem";
import { regionCategories } from "../constants";

const drawerWidth = 240;

const LeftSidebar = ({ draggables, open, setOpen }) => {
  const [dialogState, setDialogState] = useState({
    draggableItemType: 1,
    openAddEditForm: false,
    type: "create",
    itemName: "",
    itemIsActive: null,
    regionCategory: null,
    itemId: null,
  });

  return (
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
      <div className="leftsidebar-scrollable">
        {Object.keys(draggables)?.map((itm) =>
          Object.keys(draggables?.[itm])?.map((innerItem) => (
            <React.Fragment
              key={`${itm}_${innerItem}_${draggables?.[itm]?.[innerItem]?.id}`}
            >
              <Box p={1}>
                <Typography className="draggable-chips-title">
                  {itm === "inactive" ? `Ανενεργά(οί) ${innerItem}` : innerItem}
                </Typography>
                <Box display="flex" flexWrap="wrap">
                  {draggables?.[itm]?.[innerItem]?.content.map(
                    ({ itemName, itemId, isActive, regionCategory }) => (
                      <DraggableBox
                        dialogState={dialogState}
                        setDialogState={setDialogState}
                        id={itemId}
                        isActive={isActive}
                        regionCategory={regionCategory}
                        draggableCategory={draggables?.[itm]?.[innerItem]?.id}
                        name={itemName}
                        key={itemId}
                        type={draggables?.[itm]?.[innerItem]?.id?.toString()}
                      />
                    )
                  )}
                </Box>
                {itm !== "inactive" && (
                  <Chip
                    onClick={() => {
                      setDialogState({
                        ...dialogState,
                        draggableItemType: draggables?.[itm]?.[innerItem]?.id,
                        type: "create",
                        openAddEditForm: true,
                        itemName: "",
                        itemIsActive: 1,
                        regionCategory:
                          draggables?.[itm]?.[innerItem]?.id === 1 ? null : 1,
                        itemId: null,
                      });
                    }}
                    className="draggable-chip plain"
                    label="ΠΡΟΣΘΗΚΗ +"
                    size="small"
                  />
                )}
              </Box>
              {draggables?.[itm]?.[innerItem]?.id === 2 && itm === "active" && (
                <Box
                  p={1}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  flexDirection="column"
                >
                  {Object.keys(regionCategories)?.map((rc) => (
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      key={`color-indicator-${rc}`}
                    >
                      <span
                        className={`colorIndicator ${regionCategories?.[rc]}`}
                      />
                      <span>{regionCategories?.[rc].toUpperCase()}</span>
                    </Box>
                  ))}
                </Box>
              )}
            </React.Fragment>
          ))
        )}
      </div>
      <CreateOrEditDraggableItem
        dialogState={dialogState}
        setDialogState={setDialogState}
      />
    </Drawer>
  );
};

export default LeftSidebar;
