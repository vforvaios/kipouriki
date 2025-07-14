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
import { useDispatch, useSelector } from "react-redux";
import { token } from "../models/selectors/loginSelectors";
import { setCars } from "../models/actions/scheduleActions";

const ManipulateCarsModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const userToken = useSelector(token);

  const [getLoading, setGetLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [carsResult, setCarsResult] = useState([]);

  const handleChange = (e, carId) => {
    const newCars = carsResult?.map((car) => {
      return car?.id === carId ? { ...car, name: e.target.value } : { ...car };
    });
    setCarsResult(newCars);
  };

  const fetchCars = async () => {
    try {
      setGetLoading(false);
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
        setCarsResult(result.cars);
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    } finally {
      setGetLoading(false);
    }
  };

  const handleSubmitCars = async () => {
    try {
      setSaveLoading(true);
      const resp = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_API_URL}/api/cars`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          method: "POST",
          body: JSON.stringify(carsResult),
        }
      );

      const res = await resp.json();

      if (res.error) {
        enqueueSnackbar(res.error, { variant: "error" });
      } else {
        handleClose();
        enqueueSnackbar(res.message, { variant: "success" });
        // @ts-ignore
        dispatch(setCars(carsResult));
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCars();
    }
  }, [open]);

  return (
    <Dialog
      sx={{ minWidth: "400px" }}
      open={open}
      onClose={handleClose}
      className="cars-dialog"
    >
      <DialogTitle className="dialog-title">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>ΑΥΤΟΚΙΝΗΤΑ</Typography>
          <ClearIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Box>
      </DialogTitle>
      <DialogContent className="dialog-content">
        {!getLoading ? (
          <ul>
            {carsResult?.map((car) => (
              <li key={car.id}>
                <TextField
                  onChange={(e) => handleChange(e, car.id)}
                  value={car.name}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          disabled={saveLoading || getLoading}
          variant="contained"
          onClick={() => handleSubmitCars()}
        >
          ΑΠΟΘΗΚΕΥΣΗ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManipulateCarsModal;
