import React from "react";
import DraggableBox from "./DraggableBox";
import { Box, Typography, Chip } from "@mui/material";
import { regionCategories, regionCategoriesLabels } from "../constants";

const DraggableContainer = ({
  loading,
  itm,
  innerItem,
  draggables,
  dialogState,
  setDialogState,
}) => {
  return (
    <>
      <Box
        p={1}
        className={`draggable-container-withsearch ${loading ? "disabled" : ""}`}
      >
        <Typography className="draggable-chips-title">
          {itm === "inactive" ? `Ανενεργά(οί) ${innerItem}` : innerItem}
        </Typography>

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
              <span>
                {regionCategoriesLabels?.[
                  regionCategories?.[rc].toUpperCase()
                ]?.toUpperCase()}
              </span>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default DraggableContainer;
