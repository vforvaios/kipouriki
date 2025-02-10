import Box from "@mui/material/Box";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [initialDate, setInitialDate] = useState(new Date("2/3/2025"));
  const [initialDate2, setInitialDate2] = useState(new Date("2/10/2025"));

  const generateDates = (start: Date) => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      dates.push(
        date.toLocaleDateString("el-GR", {
          weekday: "short",
          month: "numeric",
          day: "numeric",
        })
      );
    }
    return dates;
  };

  const [allDatesFirstRow, setAllDatesFirstRow] = useState(
    generateDates(initialDate)
  );

  const [allDatesSecondRow, setAllDatesSecondRow] = useState(
    generateDates(initialDate2)
  );

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column">
      <Box flexBasis="50%" display="flex" flexDirection="row" gap={1} p={1}>
        {allDatesFirstRow.map((itm, index) => (
          <Box key={index} className="day" p={1} display="flex" flexBasis="20%">
            {itm}
          </Box>
        ))}
      </Box>
      <Box flexBasis="50%" display="flex" flexDirection="row" gap={1} p={1}>
        {allDatesSecondRow.map((itm, index) => (
          <Box key={index} className="day" p={1} display="flex" flexBasis="20%">
            {itm}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;
