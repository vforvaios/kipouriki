import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { token } from "../models/selectors/loginSelectors";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const CreateOrEditDraggableItem = ({ dialogState, setDialogState }) => {
  const userToken = useSelector(token);
  const [requestState, setRequestState] = useState({
    itemName: "",
    itemIsActive: 1,
    itemDraggableCategory: dialogState?.draggableItemType,
  });

  const handleAddEditForm = async () => {
    console.log(requestState);
    try {
      const promiseResult = await fetch(
        `${import.meta.env.VITE_API_URL}/api/draggable-items/item`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          method: "POST",
          body: JSON.stringify({
            name: requestState.itemName,
            draggable_category_id: requestState.itemDraggableCategory,
            isActive: requestState.itemIsActive,
            type: dialogState.type,
          }),
        }
      );
      const result = await promiseResult.json();

      if (result?.error) {
        enqueueSnackbar(result.error, { variant: "error" });
      } else {
        enqueueSnackbar("Η αποθήκευση ολοκληρώθηκε.", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return (
    <Dialog
      open={dialogState?.openAddEditForm}
      onClose={() => {
        setRequestState({
          ...requestState,
          itemName: "",
          itemDraggableCategory: 1,
        });
        setDialogState({
          ...dialogState,
          draggableItemType: 1,
          openAddEditForm: false,
        });
      }}
    >
      <DialogTitle className="dialog-title">
        {dialogState?.type === "create" ? "ΠΡΟΣΘΗΚΗ" : "ΕΝΗΜΕΡΩΣΗ"}
      </DialogTitle>
      <DialogContent className="dialog-content">
        <form noValidate>
          <FormControl fullWidth>
            <TextField
              onChange={(e) =>
                setRequestState({ ...requestState, itemName: e.target.value })
              }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="itemName"
              label="Όνομα"
              name="itemName"
              value={requestState.itemName}
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="isActive">Ενεργό</InputLabel>
            <Select
              labelId="isActive"
              id="isActive"
              value={requestState.itemIsActive}
              label="Ενεργό"
              onChange={(e) => {
                setRequestState({
                  ...requestState,
                  itemIsActive: e.target.value,
                });
              }}
            >
              <MenuItem value={1}>Ναι</MenuItem>
              <MenuItem value={0}>Όχι</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleAddEditForm()}
            >
              Αποθήκευση
            </Button>
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrEditDraggableItem;
