export const updatedCurrentSchedule = (currentSchedule, day, car, item) => ({
  ...currentSchedule,
  days: {
    ...currentSchedule.days,
    [day]: {
      ...(currentSchedule?.days?.[day] || {}),
      cars: {
        ...(currentSchedule?.days?.[day]?.cars || {}),
        [car]: {
          ...(currentSchedule?.days?.[day]?.cars?.[car] || {}),
          drivers:
            item?.draggableCategory !== 1
              ? [...(currentSchedule?.days?.[day]?.cars?.[car]?.drivers || [])]
              : [
                  ...(currentSchedule?.days?.[day]?.cars?.[car]?.drivers || []),
                ].filter((dr) => dr.id === item.id)?.length > 0
              ? [...(currentSchedule?.days?.[day]?.cars?.[car]?.drivers || [])]
              : [
                  ...(currentSchedule?.days?.[day]?.cars?.[car]?.drivers || []),
                  {
                    id: item?.id,
                    name: item?.name,
                    isActive: 1,
                    draggable_category_id: item.draggableCategory,
                    region_category: 0,
                  },
                ],
          regions:
            item?.draggableCategory !== 2
              ? [...(currentSchedule?.days?.[day]?.cars?.[car]?.regions || [])]
              : [
                  ...(currentSchedule?.days?.[day]?.cars?.[car]?.regions || []),
                ].filter((rg) => rg.id === item.id)?.length > 0
              ? [...(currentSchedule?.days?.[day]?.cars?.[car]?.regions || [])]
              : [
                  ...(currentSchedule?.days?.[day]?.cars?.[car]?.regions || []),
                  {
                    id: item?.id,
                    name: item?.name,
                    isActive: 1,
                    draggable_category_id: item.draggableCategory,
                    region_category: item.regionCategory,
                    isDone: true,
                  },
                ],
        },
      },
    },
  },
});
