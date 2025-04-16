import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DayForDownload from "./DayForDownload";
import Loader from "./Loader";

const ScheduleById = ({
  scheduleById,
  dates,
  handleClose,
  open,
  fetchScheduleById,
  fetchDatesByScheduleId,
}) => {
  const [loading, setLoading] = useState(false);
  const handleInitialData = async () => {
    setLoading(true);
    await fetchDatesByScheduleId();
    await fetchScheduleById();
    setLoading(false);
  };
  useEffect(() => {
    if (open) {
      handleInitialData();
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
            <Loader smaller />
          </Box>
        ) : (
          <Box
            gap={1}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="wrap"
            p={1}
            sx={{ height: "calc(100vh - 53px)" }}
          >
            <DayForDownload dates={dates} scheduleById={scheduleById} />
          </Box>
        )}
      </div>
    </Dialog>
  );
};

export default ScheduleById;
