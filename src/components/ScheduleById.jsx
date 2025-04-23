import { Box, Dialog, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DayForDownload from "./DayForDownload";
import Loader from "./Loader";
import html2canvas from "html2canvas";

const ScheduleById = ({
  scheduleById,
  dates,
  handleClose,
  open,
  fetchScheduleById,
  fetchDatesByScheduleId,
}) => {
  const firstMonday = new Date(dates?.startDate1);
  const temp = new Date(dates?.startDate1);
  temp.setDate(temp.getDate() + 13);
  const scheduleTitle = `${firstMonday?.toLocaleDateString("el-GR", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  })} - ${new Date(temp)?.toLocaleDateString("el-GR", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  })}`;

  const exportRef = useRef();
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

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  const exportAsImage = async (el, imageFileName) => {
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  };

  return (
    <Dialog
      className="schedulebyid-container"
      fullScreen
      onClose={handleClose}
      open={open}
      ref={exportRef}
    >
      <div className="max-popup-container">
        <Box
          className="schedulebyid-header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h1" variant="h5">
            {scheduleTitle}
          </Typography>
          <div>
            <Tooltip title="Download">
              <i
                onClick={() => exportAsImage(exportRef.current, "test")}
                style={{ cursor: "pointer", paddingRight: "8px" }}
                className={`icon-download ${loading ? "disabled" : ""}`}
              />
            </Tooltip>
            <Tooltip title="Κλείσιμο">
              <i
                onClick={handleClose}
                className="icon-cancel-circled"
                style={{ cursor: "pointer", paddingRight: "8px" }}
              />
            </Tooltip>
          </div>
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
