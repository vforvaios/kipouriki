export const manipulateFetchedDraggableItems = (obj) => ({
  active: Object.keys(obj).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        id: obj[curr].id,
        content: obj[curr].content.filter((items) => items.isActive === 1),
      },
    }),
    {}
  ),
  inactive: Object.keys(obj).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        id: obj[curr].id,
        content: obj[curr].content.filter((items) => items.isActive === 0),
      },
    }),
    {}
  ),
});
