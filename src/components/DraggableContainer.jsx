import React, { useState } from "react";
import DraggableBox from "./DraggableBox";
import { Box, Typography, TextField, Chip } from "@mui/material";
import { majorCategories, regionCategories } from "../constants";

const DraggableContainer = ({
  itm,
  innerItem,
  draggables,
  dialogState,
  setDialogState,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchDraggableItemsPerSearchTextAndItm = async (val) => {
    try {
      setLoading(true);
      const promiseResult = await fetch(
        // @ts-ignore
        `${import.meta.env.VITE_API_URL}/api/draggable-items/searchItems?active=${itm === "active" ? 1 : 0}&innerItem=${majorCategories?.[innerItem]}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const result = await promiseResult.json();
      console.log(val);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearchChange = (e) => {
    const val = e.target.value;
    setSearchText(val);
    if (val.length > 3 || !val.length) {
      fetchDraggableItemsPerSearchTextAndItm(val);
    }
  };

  return (
    <React.Fragment
      key={`${itm}_${innerItem}_${draggables?.[itm]?.[innerItem]?.id}`}
    >
      <Box
        p={1}
        className={`draggable-container-withsearch ${loading ? "disabled" : ""}`}
      >
        <Typography className="draggable-chips-title">
          {itm === "inactive" ? `Ανενεργά(οί) ${innerItem}` : innerItem}
        </Typography>
        <TextField
          autoFocus
          placeholder="Αναζήτηση..."
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
          value={searchText}
          onChange={onSearchChange}
          disabled={loading}
        />
        <Box display="flex" flexWrap="wrap">
          {draggables?.[itm]?.[innerItem]?.content.map(
            ({ itemName, itemId, isActive, regionCategory }) => (
              <DraggableBox
                dialogState={dialogState}
                setDialogState={setDialogState}
                id={itemId}
                isActive={isActive}
                regionCategory={regionCategory}
                draggableCategory={draggables?.[itm]?.[innerItem]?.id}
                name={itemName}
                key={itemId}
                type={draggables?.[itm]?.[innerItem]?.id?.toString()}
              />
            )
          )}
        </Box>
        {itm !== "inactive" && (
          <Chip
            onClick={() => {
              setDialogState({
                ...dialogState,
                draggableItemType: draggables?.[itm]?.[innerItem]?.id,
                type: "create",
                openAddEditForm: true,
                itemName: "",
                itemIsActive: 1,
                regionCategory:
                  draggables?.[itm]?.[innerItem]?.id === 1 ? null : 1,
                itemId: null,
              });
            }}
            className="draggable-chip plain"
            label="ΠΡΟΣΘΗΚΗ +"
            size="small"
          />
        )}
      </Box>
      {draggables?.[itm]?.[innerItem]?.id === 2 && itm === "active" && (
        <Box
          p={1}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="column"
        >
          {Object.keys(regionCategories)?.map((rc) => (
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              key={`color-indicator-${rc}`}
            >
              <span className={`colorIndicator ${regionCategories?.[rc]}`} />
              <span>{regionCategories?.[rc].toUpperCase()}</span>
            </Box>
          ))}
        </Box>
      )}
    </React.Fragment>
  );
};

export default DraggableContainer;
