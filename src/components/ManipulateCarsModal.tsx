import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { enqueueSnackbar } from "notistack";

const ManipulateCarsModal = ({ open, handleClose }) => {
  const [cars, setCars] = useState([]);

  const handleChange = (e, carId) => {
    const newCars = cars?.map((car) => {
      return car?.id === carId ? { ...car, name: e.target.value } : { ...car };
    });
    setCars(newCars);
  };

  const fetchCars = async () => {
    try {
      const promiseResult = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_API_URL}/api/cars`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const result = await promiseResult.json();

      if (result?.error) {
        enqueueSnackbar(result.error, { variant: "error" });
      } else {
        setCars(result.cars);
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  const handleSubmitCars = async () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    if (open) {
      fetchCars();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} className="cars-dialog">
      <DialogTitle className="dialog-title">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>ΑΥΤΟΚΙΝΗΤΑ</Typography>
          <ClearIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Box>
      </DialogTitle>
      <DialogContent className="dialog-content">
        <ul>
          {cars?.map((car) => (
            <li key={car.id}>
              <TextField
                onChange={(e) => handleChange(e, car.id)}
                value={car.name}
              />
            </li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => handleSubmitCars()}>
          ΑΠΟΘΗΚΕΥΣΗ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManipulateCarsModal;
