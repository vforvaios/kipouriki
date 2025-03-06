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

const CreateOrEditDraggableItem = ({ dialogState, setDialogState }) => {
  const [requestState, setRequestState] = useState({
    itemName: "",
    itemDraggableCategory: dialogState?.draggableItemType,
  });

  const handleAddEditForm = () => {
    console.log(requestState);
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
              value={requestState.itemDraggableCategory}
              label="Ενεργό"
              onChange={(e) => {
                setRequestState({
                  ...requestState,
                  itemDraggableCategory: e.target.value,
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
