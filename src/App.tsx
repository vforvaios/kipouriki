import Box from "@mui/material/Box";
import "./App.css";

function App() {
  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column">
      <Box flexBasis="50%" display="flex" flexDirection="row" gap={1} p={1}>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Δευτέρα
        </Box>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Τρίτη
        </Box>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Τετάρτη
        </Box>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Πέμπτη
        </Box>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Παρασκευή
        </Box>
      </Box>
      <Box flexBasis="50%" display="flex" flexDirection="row" gap={1} p={1}>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Δευτέρα
        </Box>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Τρίτη
        </Box>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Τετάρτη
        </Box>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Πέμπτη
        </Box>
        <Box className="day" p={1} display="flex" flexBasis="20%">
          Παρασκευή
        </Box>
      </Box>
    </Box>
  );
}

export default App;
