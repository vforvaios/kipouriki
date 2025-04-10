import React from "react";

const SliderDays = ({ dateToDisplay }) => {
  const stylableDay = dateToDisplay?.split(" ");

  return (
    <div
      className={`day-of-the-week upper ${
        dateToDisplay ===
        new Date()?.toLocaleDateString("el-GR", {
          weekday: "short",
          month: "numeric",
          day: "numeric",
        })
          ? "today"
          : ""
      }`}
    >
      <strong className="day-text">{stylableDay?.[0]}</strong>
      <strong className="day-number">{stylableDay?.[1]}</strong>
    </div>
  );
};

export default SliderDays;
