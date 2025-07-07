import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const LeftBarSkeleton = () => {
  return (
    <Stack
      direction="row"
      sx={{ padding: "4px" }}
      spacing={1}
      flexWrap="wrap"
      gap={1}
    >
      {[...Array(9)].map((_, index) => (
        <Box key={index}>
          <Skeleton
            variant="rounded"
            width={80 + Math.floor(Math.random() * 60)} // Random πλάτος για πιο ρεαλιστικό loading
            height={16}
            sx={{
              fontSize: "0.5rem",
              padding: "2px",
              borderRadius: "6px",
              height: 16,
              marginBottom: "4px",
            }}
          >
            &nbsp;
          </Skeleton>
        </Box>
      ))}
    </Stack>
  );
};

export default LeftBarSkeleton;
