import React, { useEffect, useState } from "react";

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
import { allDraggables } from "../models/selectors/scheduleSelectors";
import { setDraggableItems } from "../models/actions/scheduleActions";
import { useSelector, useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { regionCategories } from "../constants";

const CreateOrEditDraggableItem = ({ dialogState, setDialogState }) => {
  const dispatch = useDispatch();
  const userToken = useSelector(token);
  const existingDraggables = useSelector(allDraggables);
  const [requestState, setRequestState] = useState({
    itemName: dialogState?.itemName || "",
    itemIsActive: dialogState?.itemIsActive,
    itemDraggableCategory: dialogState?.draggableItemType,
    itemRegionCategory: dialogState?.regionCategory,
    id: dialogState?.itemId || null,
  });

  const handleAddEditForm = async () => {
    const payload = {
      name: requestState.itemName,
      draggable_category_id: requestState.itemDraggableCategory,
      isActive: requestState.itemIsActive,
      type: dialogState.type,
      regionCategory: Number(requestState?.itemRegionCategory) || 0,
      ...(requestState?.itemId && { id: requestState.itemId }),
    };

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
          body: JSON.stringify(payload),
        }
      );
      const result = await promiseResult.json();

      if (result?.error) {
        enqueueSnackbar(result.error, { variant: "error" });
      } else {
        const newDraggables = Object.keys(existingDraggables).reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: {
              ...existingDraggables[curr],
              content:
                requestState.itemDraggableCategory !==
                existingDraggables[curr]?.id
                  ? [...existingDraggables[curr]?.content]
                  : dialogState.type === "create"
                  ? [
                      ...existingDraggables[curr]?.content,
                      {
                        itemId: result?.id,
                        itemName: requestState?.itemName,
                        draggableCategory: requestState?.itemDraggableCategory,
                        isActive: requestState?.itemIsActive,
                        regionCategory: requestState?.itemRegionCategory,
                      },
                    ]
                  : existingDraggables[curr]?.content?.map((dragg) => {
                      return dragg?.itemId !== requestState.itemId
                        ? { ...dragg }
                        : {
                            ...dragg,
                            itemId: result?.id,
                            itemName: requestState?.itemName,
                            draggableCategory:
                              requestState?.itemDraggableCategory,
                            isActive: requestState?.itemIsActive,
                            regionCategory: requestState?.itemRegionCategory,
                          };
                    }),
            },
          }),
          {}
        );

        dispatch(setDraggableItems(newDraggables));
        enqueueSnackbar("Η αποθήκευση ολοκληρώθηκε.", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  useEffect(() => {
    setRequestState({
      itemName: dialogState?.itemName || "",
      itemIsActive: dialogState?.itemIsActive,
      itemDraggableCategory: dialogState?.draggableItemType,
      itemRegionCategory: dialogState?.regionCategory,
      itemId: dialogState?.itemId,
    });
  }, [
    dialogState.openAddEditForm,
    dialogState.itemName,
    dialogState.isActive,
    dialogState.regionCategory,
    dialogState.itemId,
  ]);

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
              value={requestState?.itemIsActive || 0}
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
          {requestState?.itemRegionCategory && (
            <FormControl fullWidth>
              <InputLabel id="itemRegionCategory">Κατηγορία task</InputLabel>
              <Select
                labelId="isActive"
                id="isActive"
                value={requestState?.itemRegionCategory || 1}
                label="Κατηγορία task"
                onChange={(e) => {
                  setRequestState({
                    ...requestState,
                    itemRegionCategory: e.target.value,
                  });
                }}
              >
                {Object.keys(regionCategories)?.map((rc) => (
                  <MenuItem
                    key={`create-edit-region-category-${rc}`}
                    value={rc}
                  >
                    {regionCategories?.[rc]?.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
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
