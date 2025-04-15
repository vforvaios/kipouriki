import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DayForDownload from "./DayForDownload";

const ScheduleById = ({
  scheduleById,
  dates,
  handleClose,
  open,
  fetchScheduleById,
  loading,
}) => {
  useEffect(() => {
    if (open) {
      fetchScheduleById();
    }
  }, [open]);

  return (
    <Dialog
      className="schedulebyid-container"
      fullScreen
      onClose={handleClose}
      open={open}
    >
      <div className="max-popup-container">
        <Box
          className="schedulebyid-header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h1" variant="h5">
            Πρόγραμμα προς download
          </Typography>
          <i
            onClick={handleClose}
            className="icon-cancel-circled"
            style={{ cursor: "pointer", paddingRight: "8px" }}
          />
        </Box>
        {loading ? (
          <Box
            sx={{ padding: 20 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Loading...
          </Box>
        ) : (
          <Box
            gap={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="wrap"
            p={1}
          >
            <DayForDownload dates={dates} scheduleById={scheduleById} />
          </Box>
        )}
      </div>
    </Dialog>
  );
};

export default ScheduleById;
