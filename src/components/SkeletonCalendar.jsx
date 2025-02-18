import React from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonCalendar = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      style={{ marginLeft: "-240px" }}
    >
      <Box
        className="days-row-container"
        flexBasis="50%"
        display="flex"
        flexDirection="row"
        gap={0.5}
        p={0.5}
      >
        {Array.from([1, 2, 3, 4, 5], (itm, index) => (
          <Box
            key={`skeleton-row1-${index}`}
            className="day"
            p={1}
            display="flex"
            flexDirection="column"
          >
            <Skeleton
              className="day-of-the-week"
              variant="rectangular"
              width={"100%"}
              height={40}
            />

            <Box
              display="flex"
              flexGrow={1}
              justifyContent="stretch"
              alignItems="stretch"
              className="tiles-container"
            >
              <Skeleton variant="rectangular" width={"100%"} height={118} />
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        className="days-row-container"
        flexBasis="50%"
        display="flex"
        flexDirection="row"
        gap={0.5}
        p={0.5}
      >
        {Array.from([1, 2, 3, 4, 5], (itm, index) => (
          <Box
            key={`skeleton-row2-${index}`}
            className="day"
            p={1}
            display="flex"
            flexDirection="column"
          >
            <Skeleton
              className="day-of-the-week"
              variant="rectangular"
              width={"100%"}
              height={40}
            />

            <Box
              display="flex"
              flexGrow={1}
              justifyContent="stretch"
              alignItems="stretch"
              className="tiles-container"
            >
              <Skeleton variant="rectangular" width={"100%"} height={118} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SkeletonCalendar;
