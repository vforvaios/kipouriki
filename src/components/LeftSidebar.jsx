import React, { useState, useCallback, useEffect, useRef } from "react";
import { Box, Drawer, Tooltip, TextField } from "@mui/material";
import CreateOrEditDraggableItem from "./CreateOrEditDraggableItem";
import DraggableContainer from "./DraggableContainer";
import { majorCategories } from "../constants";
import { debounce } from "../utils";
import { setDraggableItems } from "../models/actions/scheduleActions";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useDispatch } from "react-redux";
import LeftBarSkeleton from "./LeftBarSkeleton";

const drawerWidth = 240;

const LeftSidebar = ({ draggables, open, setOpen }) => {
  const [dialogState, setDialogState] = useState({
    draggableItemType: 1,
    openAddEditForm: false,
    type: "create",
    itemName: "",
    itemIsActive: null,
    regionCategory: null,
    itemId: null,
  });

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchDraggableItemsPerSearchTextAndItm = async (val) => {
    try {
      setLoading(true);
      const promiseResult = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_API_URL}/api/draggable-items/searchItems?term=${val}`,
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
        dispatch(setDraggableItems(result.items));
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((val) => {
      fetchDraggableItemsPerSearchTextAndItm(val);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchText(val);
    debouncedFetch(val);
  };

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  return (
    <Drawer
      onClose={() => setOpen(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box display="flex" p={1} justifyContent="flex-end" alignItems="center">
        <Tooltip title="Κλείσιμο">
          <i
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
            className="icon-cancel-circled"
          />
        </Tooltip>
      </Box>
      <Box display="flex" p={1} justifyContent="flex-end" alignItems="center">
        <TextField
          autoFocus
          inputRef={inputRef}
          placeholder="Αναζήτηση..."
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
          value={searchText}
          onChange={handleSearchChange}
          disabled={loading}
        />
      </Box>

      {loading ? (
        <LeftBarSkeleton />
      ) : (
        <>
          <div className="leftsidebar-scrollable">
            {Object.keys(draggables)
              ?.sort()
              ?.map((itm) =>
                Object.keys(draggables?.[itm])
                  ?.sort()
                  ?.map((innerItem) => (
                    <DraggableContainer
                      key={`${itm}_${innerItem}_${draggables?.[itm]?.[innerItem]?.id}`}
                      itm={itm}
                      loading={loading}
                      innerItem={innerItem}
                      draggables={draggables}
                      dialogState={dialogState}
                      setDialogState={setDialogState}
                    />
                  ))
              )}
          </div>
          <CreateOrEditDraggableItem
            dialogState={dialogState}
            setDialogState={setDialogState}
          />
        </>
      )}
    </Drawer>
  );
};

export default LeftSidebar;
